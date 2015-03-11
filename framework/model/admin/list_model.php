<?php
/*****************************************************************************************
	文件： {phpok}/model/admin/list_model.php
	备注： 主题内容管理
	版本： 4.x
	网站： www.phpok.com
	作者： qinggan <qinggan@188.com>
	时间： 2015年02月06日 22时18分
*****************************************************************************************/
if(!defined("PHPOK_SET")){exit("<h1>Access Denied</h1>");}
class list_model extends list_model_base
{
	public function __construct()
	{
		parent::__construct();
	}

	public function delete($id,$mid=0)
	{
		if(!$mid)
		{
			$sql = "SELECT module_id FROM ".$this->db->prefix."list WHERE id='".$id."'";
			$rs = $this->db->get_one($sql);
			$mid = $rs['module_id'];
		}
		//删除扩展主题信息
		$sql = "DELETE FROM ".$this->db->prefix."list_".$mid." WHERE id='".$id."'";
		$this->db->query($sql);
		//
		$sql = "DELETE FROM ".$this->db->prefix."list WHERE id='".$id."'";
		$this->db->query($sql);
		//删除相关的回复信息
		$sql = "DELETE FROM ".$this->db->prefix."reply WHERE tid='".$id."'";
		$this->db->query($sql);
		//删除Tag相关
		$sql = "DELETE FROM ".$this->db->prefix."tag_stat WHERE title_id='".$id."'";
		$this->db->query($sql);
		return true;
	}

	public function update_status($id,$status=0)
	{
		$sql = "UPDATE ".$this->db->prefix."list SET status='".$status."' WHERE id='".$id."'";
		return $this->db->query($sql);
	}

	public function update_sort($id,$sort=0)
	{
		$sql = "UPDATE ".$this->db->prefix."list SET sort='".$sort."' WHERE id='".$id."'";
		return $this->db->query($sql);
	}
}

?>