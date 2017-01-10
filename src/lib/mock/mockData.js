
// Mock.mock(/authStatus/, {
//   "hasLogin": true
// });

// Mock.mock(/\/getRemoteSelectList\.htm/, {
//   result: true,
//   message: '',
//   'data|10': [{ name: '@cname', no: '@integer(1,100)' }]
// });

// Mock.mock(/\getHttpDemo\.htm/, {
//   result: true,
//   'data': {
//     'list|12': [{ name: '@cname', value: '@integer(1,100)' }]
//   }
// });

// Mock.mock(/\/mySystem\/presentUser/, {
//   "result": true,
//   "data": {
//     "userName": "严杰",
//     "userID": "12345678"
//   }
// });
// Mock.mock(/\/system\/stateNum\.do/, {
//   "result": true,
//   "data": {
//     "list": [
//       { 'state': '已停止', 'num': '500' },
//       { 'state': '运行中', 'num': '1000' }
//     ]
//   }
// });
Mock.mock(/\/system\/stateNum\.do/, {
  "result": false,
  "msg": '获取概览页出错'
});
Mock.mock(/\/system\/record\.do/, {
  "result": true,
  "data": {
    "list": [
    ]
  }
});
// Mock.mock(/\/system\/record\.do/, {
//   "result": true,
//   "data": {
//     "list|10": [
//       {
//         'systemName': '易购主站',
//         'exName|+1': 201607090001,
//         'exEnvirment': 'PRD',
//         "exMySqlVersion": 'Mysql5.5',
//         "exOperation": 'MySQL5.5升级到MySQL5.6',
//         "exOperationResult": '成功',
//         "exOperationTime": '2015-03-26 16:20:35',
//         'exDataDoc': '/help.docx'
//       }
//     ]
//   }
// });
// Mock.mock(/\/system\/exDatas\.do/, {
//   "result": true,
//   "data": {
//     "list|17": [
//       {
//         'exName|+1': 201607090001,
//         'exAnotherName': '大促',
//         'exSystemName': '豆芽',
//         "exEnvirment": 'SIT',
//         "exType": '主',
//         "exState": '运行中',
//         "exMainIP": '192.168.1.11',
//         "exSecondIPs": ['192.168.1.12', '192.168.1.10', '192.168.1.13'],
//         "exReadVIP": 'xxx.xxx.xxx.xxx',
//         "exWriteVIP": 'xxx.xxx.xxx.xxx',
//         "exMySqlVersion": 'Mysql5.6',
//         "modify": true
//       },
//     ]
//   }
// });
// Mock.mock(/\/system\/exDatasUp\.do/, {
//   "result": true,
//   "data": {
//     "list|33": [
//       {
//         'exOddNumber|+1': 201607090001,
//         'exNumber|1-3': 1,
//         'exPerson': '陈庆通',
//         'exSystem': '豆芽',
//         "exEnvirment": 'SIT',
//         "exMainIP": '192.168.1.11:8080',
//         "exSecondIPs": ['192.168.1.12', '192.168.1.10', '192.168.1.13'],
//         "exReadVIP": 'xxx.xxx.xxx.xxx',
//         "exWriteVIP": 'xxx.xxx.xxx.xxx',
//       },

//     ]
//   }
// });
// Mock.mock(/\/system\/exDatasUped\.do/, {
//   "result": true,
//   "data": {
//     "list|11": [
//       {
//         'exOddNumber|+1': 201607090001,
//         'exNumber|1-3': 1,
//         'exPerson': '陈庆通',
//         'exSystem': '豆芽',
//         "exEnvirment": 'SIT',
//         "exMainIP": '192.168.1.11:8080',
//         "exSecondIPs": ['192.168.1.12', '192.168.1.10', '192.168.1.13'],
//         "exReadVIP": 'xxx.xxx.xxx.xxx',
//         "exWriteVIP": 'xxx.xxx.xxx.xxx',
//         'upResult': "成功"
//       },
//     ]
//   }
// });
// Mock.mock(/\/system\/exLog\.do/, {
//   "result": true,
//   "data": {
//     "result|2-8": true,
//     "logs|3-5": [
//       [
//         '2016-07-08日志:',
//         '实例100013-201505210939开始升级:',
//         '2016-07-08 21:09:56 xxxxxxxxxxxxxxxxxxxx',
//         '2016-07-08 21:19:56 xxxxxxxxxxxxxxxxxxxx',
//         '2016-07-08 21:29:56 xxxxxxxxxxxxxxxxxxxx',
//         '2016-07-08 21:39:56 xxxxxxxxxxxxxxxxxxxx',
//         '2016-07-08 21:49:56 xxxxxxxxxxxxxxxxxxxx',
//         '2016-07-08 21:59:56 xxxxxxxxxxxxxxxxxxxx',
//         '2016-07-08 22:09:56 xxxxxxxxxxxxxxxxxxxx',
//         '实例100013-201505210939升级成功！',
//         '实例100013-201505210939升级失败，请查看xxxx文件或者联系运维人员。']

//     ]
//   }
// });
// Mock.mock(/\/system\/update\.do/, {
//   "result": true,
//   "data": {
//     "result|8-2": false
//   }
// });
// Mock.mock(/\/system\/toggle\.do/, {
//   "result": true,
//   "data": {
//     "result": true
//   }
// });

// // Mock.mock(/\/instances$/, {
// //   "result": true,
// //   "data": {
// //     "pageNumber": 2,
// //     "pageSize": 10,
// //     "pageTotal": 33,
// //     "list|33": [
// //       {
// //         'instanceID': '1',
// //         'systemName|1': ['苏宁云数据库(snds)', '去商业数据库项目(APP)', '风控系统(WAS)', '分布式缓存服务(dcs)', 'Sentinel集群管理(stl)', 'MySQL5.6项目(rds)'],
// //         'instanceAlias|1': ['sndsapp', 'sndsprd1', 'sndswas1', 'dcssit1', 'Sentinel', 'rdsprd'],
// //         'haType': '1主2从',
// //         'version': 'MySQL5.6',
// //         'env|1': ['snds_PRD', 'APP_PRD', 'WAS_PRD', 'dcs_SIT', 'stl_SIT', 'rds_SIT'],
// //         'f|1': ['运行中', '已停止', '异常'],
// //         'createTime|1': ['2016-11-1 10:08:02', '2016-11-1 10:09:50', '2016-11-11 17:20:02', '2016-10-11 23:15:02']
// //       },
// //     ]
// //   }
// // });
// Mock.mock(/\/instances\/\d/, {
//   "result": true,
//   "data": {
//     systemName: '苏宁云数据库（snds）',
//     clusterSN: '999999-201505210939',
//     instanceId: '	100013-201505210939',
//     haRole: '主',	//实例类型
//     center: '云事业部',	//所属中心
//     envName: 'snds_PRD',	//环境名称
//     zone: 'OS雨花Juno4',	//位置
//     proposer: '刘伟',	//负责人姓名
//     proposerCode: '16081377',	//负责人工号
//     createTime: '2016-11-1 10:08:02',	//实例创建日期
//     vmName: 'sndsprddb01',	//服务器名称
//     port: '3306',	//端口
//     vmIP: '192.168.180.66',	//虚拟机地址
//     hostIP: '10.27.3.150',	//物理机地址
//     rvip: '10.100.33.74',	//只读VIP地址
//     wvip: '10.100.33.73',	//读写VIP地址
//     status: '运行中',	//运行状态
//     usedDataDiskSize: '200G / 600G',	//已用空间
//     cpuCores: '8核',	//CPU
//     memory: '64G', //	内存
//     osDiskSize: '50G',	//系统盘
//     dataDiskSize: '300G',	//数据盘 / 存储
//     os: 'Red Hat Enterprise Linux Server 6.3 (64 Bit)',	//操作系统
//     dbEngine: 'MySQL Percona Server 5.6.2365'	//数据库版本
//   }
// });
// Mock.mock(/\/instances\/myServices$/, {
//   "result": true,
//   "data": {
//     "pageNumber": 2,
//     "pageSize": 10,
//     "pageTotal": 33,
//     "list|33": [
//       {
//         id:1,
//         'systemName': '苏宁云数据库(snds)',
//         'envName': 'snds_PRD',
//         'proposer': '王小欢',
//         'proposerCode': '15040639',
//         'requestTime': '@now()',
//         'orderStatus|1': ['可用', '创建中', '已销毁', '已驳回', '审核通过', '安装中', '待审核'],
//         'type': 'SNDS-MySQL5.6'
//       },
//     ]
//   }
// });
// Mock.mock(/\/instances\/myServices\/status/, {
//   "result": true,
//   "data": {
//     "status": [
//       {
//         name: '可用',
//         code: 1,
//       },
//       {
//         name: '创建中',
//         code: 2,
//       }
//     ],
//     type: [
//       {
//         name: 'dev',
//         code: 1,
//       },
//       {
//         name: 'sit',
//         code: 2,
//       },
//     ]
//   }
// });
// Mock.mock(/\/instances\/myServices\/\d\/log/, {
//   "result": true,
//   "data": {
//     msg:'审核阶段开始：\n1、xxxxx成功 / 失败（描述失败原因及解决方法）\n2、xxxxx成功 / 失败（描述失败原因及解决方法）\n审核阶段结束！'
//   }
// });
// Mock.mock(/\/mySystem$/, {
//   "result": true,
//   "data": {
//     mySystem:[{
//       id:1,
//       name:'苏宁数据库系统',
//       nameEn:'snds',
//       code:'xxd'
//     }]
//   }
// });
// Mock.mock(/\/mySystem\/\d\/envs/, {
//   "result": true,
//   "data": {
//     envs:[{
//       id:1,
//       name:'sit',
//       nameEn:'snds',
//       code:'xxd'
//     }]
//   }
// });
// Mock.mock(/\/mySystem\/templates/, {
//   "result": true,
//   "data": {
//     cpuCores:[{
//       id:1,
//       name:'1c8G',
//       nameEn:'snds',
//       code:'xxd'
//     }]
//   }
// });