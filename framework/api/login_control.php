<?php
/**
 * 会员登录，基于API请求
 * @package phpok\api
 * @作者 qinggan <admin@phpok.com>
 * @版权 2015-2016 深圳市锟铻科技有限公司
 * @主页 http://www.phpok.com
 * @版本 4.x
 * @授权 http://www.phpok.com/lgpl.html PHPOK开源授权协议：GNU Lesser General Public License
 * @时间 2016年07月25日
**/

if(!defined("PHPOK_SET")){exit("<h1>Access Denied</h1>");}
class login_control extends phpok_control
{
	/**
	 * 构造函数
	**/
	public function __construct()
	{
		parent::control();
	}

	/**
	 * 会员登录接口
	 * @参数 _chkcode 验证码
	 * @参数 user 会员账号/邮箱/手机号
	 * @参数 pass 会员密码
	**/
	public function save_f()
	{
		if($this->session->val('user_id')){
			$this->json(P_Lang('您已是本站会员，不需要再次登录'));
		}
		if($this->config['is_vcode'] && function_exists('imagecreate')){
			$code = $this->get('_chkcode');
			if(!$code){
				$this->json(P_Lang('验证码不能为空'));
			}
			$code = md5(strtolower($code));
			if($code != $this->session->val('vcode')){
				$this->json(P_Lang('验证码填写不正确'));
			}
			$this->session->unassign('vcode');
		}
		$user = $this->get("user");
		if(!$user){
			$this->json(P_Lang('账号不能为空'));
		}
		$pass = $this->get("pass");
		if(!$pass){
			$this->json(P_Lang('会员密码不能为空'));
		}
		//多种登录方式
		$user_rs = $this->model('user')->get_one($user,'user');
		if(!$user_rs){
			$user_rs = $this->model('user')->get_one($user,'email');
			if(!$user_rs){
				$user_rs = $this->model('user')->get_one($user,'mobile');
				if(!$user_rs){
					$this->json(P_Lang('会员信息不存在'));
				}
			}
		}
		if(!$user_rs['status']){
			$this->json(P_Lang('会员审核中，暂时不能登录'));
		}
		if($user_rs['status'] == '2'){
			$this->json(P_Lang('会员被管理员锁定，请联系管理员解锁'));
		}
		if(!password_check($pass,$user_rs["pass"])){
			$this->json(P_Lang('登录密码不正确'));
		}
		$this->session->assign('user_id',$user_rs['id']);
		$this->session->assign('user_gid',$user_rs['group_id']);
		$this->session->assign('user_name',$user_rs['user']);
		$this->model('wealth')->login($user_rs['id'],P_Lang('会员登录'));
		$this->json(true);
	}

	/**
	 * 会员登录别名
	**/
	public function index_f()
	{
		$this->save_f();
	}

	/**
	 * 请求取回密码功能
	 * @参数 _chkcode 验证码
	 * @参数 email 邮箱
	**/
	public function getpass_f()
	{
		//判断是否是会员
		if($this->session->val('user_id')){
			$this->json(P_Lang('您已是本站会员，不能执行这个操作'));
		}
		//检测是否启用验证码
		if($this->config['is_vcode'] && function_exists('imagecreate')){
			$code = $this->get('_chkcode');
			if(!$code){
				$this->json(P_Lang('验证码不能为空'));
			}
			$code = md5(strtolower($code));
			if($code != $this->session->val('vcode')){
				$this->json(P_Lang('验证码填写不正确'));
			}
			$this->session->unassign('vcode');
		}
		$email = $this->get('email');
		if(!$email){
			$this->json(P_Lang('邮箱不能为空'));
		}
		if(!phpok_check_email($email)){
			$this->json(P_Lang('邮箱验证不通过'));
		}
		$rs = $this->model('user')->user_email($email);
		if(!$rs){
			$this->json(P_Lang('邮箱不存在'));
		}
		if(!$rs['status']){
			$this->json(P_Lang('会员账号审核中，暂时不能使用取回密码功能'));
		}
		if($rs['status'] == '2'){
			$this->json(P_Lang('会员账号被管理员锁定，不能使用取回密码功能，请联系管理员'));
		}
		$email_server = $this->model('gateway')->get_default('email');
		if(!$email_server){
			$this->json(P_Lang('邮箱取回密码功能未启用，请联系我们的客服'));
		}
		$code = str_rand(10).$this->time;
		$this->model('user')->update_code($code,$rs['id']);
		$email_rs = $this->model('email')->get_identifier('getpass',$this->site['id']);
		if(!$email_rs){
			$this->json(P_Lang('邮件模板为空，请配置邮件模板'));
		}
		$link = $this->url('login','repass','_code='.rawurlencode($code),'www');
		$this->assign('link',$link);
		$this->assign('email',$email);
		$this->assign('code',$code);
		$this->assign('user',$rs);
		$title = $this->fetch($email_rs["title"],"content");
		$content = $this->fetch($email_rs["content"],"content");
		$info = $this->lib('email')->send_mail($email,$title,$content);
		if(!$info){
			$this->json($this->lib('email')->error());
		}
		$this->json(true);
	}

	/**
	 * 通过取回密码进行修改
	 * @参数 _chkcode 验证码
	 * @参数 code 验证串
	 * @参数 user 会员账号
	 * @参数 email 邮箱
	 * @参数 newpass 新密码
	 * @参数 chkpass 确认密码
	**/
	public function repass_f()
	{
		if($this->session->val('user_id')){
			$this->json(P_Lang('您已是本站会员，不能执行这个操作'));
		}
		//判断是否启用验证码功能
		if($this->config['is_vcode'] && function_exists('imagecreate')){
			$code = $this->get('_chkcode');
			if(!$code){
				$this->json(P_Lang('验证码不能为空'));
			}
			$code = md5(strtolower($code));
			if($code != $this->session->val('vcode')){
				$this->json(P_Lang('验证码填写不正确'));
			}
			$this->session->unassign('vcode');
		}
		$code = $this->get('code');
		if(!$code){
			$this->json(P_Lang('验证串不能为空'));
		}
		$time = intval(substr($code,-10));
		if(($this->time - $time) > (24*60*60)){
			$this->json(P_Lang('验证串已过期或无效'));
		}
		$user = $this->get('user');
		if(!$user){
			$this->json(P_Lang('会员账号不能为空'));
		}
		$rs = $this->model('user')->chk_name($user);
		if(!$rs){
			$this->json(P_Lang('会员账号不存在'));
		}
		if(!$rs['status']){
			$this->json(P_Lang('会员账号审核中，暂时不能使用取回密码功能'));
		}
		if($rs['status'] == '2'){
			$this->json(P_Lang('会员账号被管理员锁定，不能使用取回密码功能，请联系管理员'));
		}
		if($rs['code'] != $code){
			$this->json(P_Lang('验证串不一致'));
		}
		$email = $this->get('email');
		if(!$email){
			$this->json(P_Lang('邮箱不能为空'));
		}
		if($rs['email'] != $email){
			$this->json(P_Lang('邮箱与账号不匹配'));
		}
		$newpass = $this->get('newpass');
		if(!$newpass){
			$this->json(P_Lang('密码不能为空'));
		}
		$chkpass = $this->get('chkpass');
		if(!$chkpass){
			$this->json(P_Lang('确认密码不能为空'));
		}
		if($newpass != $chkpass){
			$this->json(P_Lang('两次输入的密码不一致'));
		}
		$pass = password_create($newpass);
		$this->model('user')->update_password($pass,$rs['id']);
		$this->json(true);
	}

	/**
	 * 登录状态判断
	**/
	public function status_f()
	{
		if($this->session->val('user_id')){
			$array = array('user_id'=>$this->session->val('user_id'));
			$array['user_name'] = $this->session->val('user_name');
			$array['user_gid'] = $this->session->val('user_gid');
			$this->json($array,true);
		}else{
			$this->json(false);
		}
	}
}

?>