;<?php exit("<h1>Access Denied</h1>");?>

[session]
;SESSION�������
;�Ự���淽ʽ��Ĭ���� default��֧�� default��sql��file
file = default

;�Ự��ȡ������������ Cookie �����õ�ʱ��ʹ��
id = PHPSESSION

;�Ự��ʱʱ�䣬��λ����
timeout = 3600

;��Ա��ʱ�ļ��洢Ŀ¼��Ĭ���� data/session/������ {dir_data}��{dir_cache}��{dir_root}
path = "{dir_data}session/"

;���Ự�洢�����洢��ʽΪ���ݿ�ʱ��ִ�д����ã�������ǰ׺
table = 'session'

;��Ա�Զ����з�����������Ŀǰ������Ϊ sql
methods = "auto_start:db"

[cache]
;������������
;�Ƿ����û��� false��ʹ�� trueʹ�ã����ú����ϵͳ�����ϻ��棬����false��
status = true
;�Ƿ����õ���ģʽ
debug = false

;�������ͣ�Ŀǰ֧�ֵ��У�default memcache redis
file = default

;�������ʱ�䣬��λ����
timeout = 3600

;�����ļ�Ŀ¼������Ϊ default ʱ��Ч������ {dir_data}��{dir_cache}��{dir_root}
folder = "{dir_cache}"

;���������������ʹ�� memcache redis ʱ��Ч
server = "127.0.0.1"

;���������ʹ�õĶ˿ڣ�����ʹ�� mecache redis ʱ��Ч
port = "6379"

;����Keyǰ׺����ֹ���ɵ�Key�ظ�
prefix = "qinggan_"