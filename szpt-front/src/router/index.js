import Vue from 'vue'
import Router from 'vue-router'
import * as Pages from '../pages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/basicSituation'
    },
    {
      path: '/home',
      component: Pages.Home,
      redirect: '/home/basicSituation',
      children: [
        {
          path: 'basicSituation',
          component: Pages.BasicSituation
        },
        {
          path: 'schoolFunding',
          component: Pages.SchoolFunding
        },
        {
          path: 'majors',
          component: Pages.Majors
        },
        {
          path: 'teachStaff',
          component: Pages.TeachStaff
        },
        {
          path: 'studentInf',
          component: Pages.StudentInf
        },
        {
          path: 'teachDevice',
          component: Pages.TeachDevice
        }
      ]
    },
    {
      path: '/schoolPro',
      component: Pages.SchoolPro,
      redirect: '/schoolPro/areaDataCollect',
      children: [
        {
          path: 'areaDataCollect',
          component: Pages.SchoolProAreaDataCollect
        },
        {
          path: 'total',
          component: Pages.SchoolProTotal
        },
        {
          path: 'reportedTotal',
          component: Pages.SchoolProReportedTotal
        },
        {
          path: 'groupByCategoryT',
          component: Pages.SchoolProGroupByCategoryT
        },
        {
          path: 'groupByGradeT',
          component: Pages.SchoolProGroupByGradeT
        },
        {
          path: 'groupByOrganizersT',
          component: Pages.SchoolProGroupByOrganizersT
        },
        {
          path: 'groupBySchoolTypeT',
          component: Pages.SchoolProGroupBySchoolTypeT
        },
        {
          path: 'groupByRectifyConcT',
          component: Pages.SchoolProGroupByRectifyConcT
        }
      ]
    },
    {
      path: '/fundsInput',
      component: Pages.FundsInput,
      redirect: '/fundsInput/regeionDataSum',
      children: [
        {
          path: 'regeionDataSum',
          component: Pages.RegeionDataSum
        }, {
          path: 'incomeTotal',
          component: Pages.IncomeTotal
        }, {
          path: 'incomeTotalAvg',
          component: Pages.IncomeTotalAvg
        }, {
          path: 'schoolIncomePer',
          component: Pages.SchoolIncomePer
        }, {
          path: 'tuitionIncomePer',
          component: Pages.TuitionIncomePer
        }, {
          path: 'studentIncomeAvg',
          component: Pages.StudentIncomeAvg
        }, {
          path: 'expendTotal',
          component: Pages.ExpendTotal
        }, {
          path: 'expendTotalAvg',
          component: Pages.ExpendTotalAvg
        }, {
          path: 'schoolExpendPer',
          component: Pages.SchoolExpendPer
        }, {
          path: 'teachExpendPer',
          component: Pages.TeachExpendPer
        }
      ]
    },
    {
      path: '/schoolCondition',
      component: Pages.SchoolCondition,
      redirect: '/schoolCondition/schoolConditionSum',
      children: [
        {
          path: 'schoolConditionSum',
          component: Pages.SchoolConditionSum
        }, {
          path: 'coverTotalArea',
          component: Pages.CoverTotalArea
        }, {
          path: 'coverTotalAreaAvgSch',
          component: Pages.CoverTotalAreaAvgSch
        }, {
          path: 'coverTotalAreaAvgStu',
          component: Pages.CoverTotalAreaAvgStu
        }, {
          path: 'buildTotalArea',
          component: Pages.BuildTotalArea
        }, {
          path: 'buildTotalAreaAvgSch',
          component: Pages.BuildTotalAreaAvgSch
        }, {
          path: 'teachAdminTotalArea',
          component: Pages.TeachAdminTotalArea
        }, {
          path: 'rightBuildAreaAvgStu',
          component: Pages.RightBuildAreaAvgStu
        }, {
          path: 'dormitoryAreaAvgStu',
          component: Pages.DormitoryAreaAvgStu
        }, {
          path: 'bookNumAvgSch',
          component: Pages.BookNumAvgSch
        }, {
          path: 'bookNumAvgStu',
          component: Pages.BookNumAvgStu
        }, {
          path: 'yearBookEntryAvgStu',
          component: Pages.YearBookEntryAvgStu
        }, {
          path: 'mediaRoomNumAvgSch',
          component: Pages.MediaRoomNumAvgSch
        }, {
          path: 'computerNumAvgStu',
          component: Pages.ComputerNumAvgStu
        }, {
          path: 'teachEquipAvgSch',
          component: Pages.TeachEquipAvgSch
        }, {
          path: 'teachEquipAvgStu',
          component: Pages.TeachEquipAvgStu
        }, {
          path: 'inschTrainBaseAvgSch',
          component: Pages.InschTrainBaseAvgSch
        }, {
          path: 'outschTrainBaseAvgSch',
          component: Pages.OutschTrainBaseAvgSch
        }, {
          path: 'inschTrainStationAvgSch',
          component: Pages.InschTrainStationAvgSch
        }, {
          path: 'inschBaseAreaAvgSch',
          component: Pages.InschBaseAreaAvgSch
        }
      ]
    },
    {
      path: '/specialtyCon',
      component: Pages.SpecialtyConIndex,
      redirect: '/specialtyCon/areaDataCollect',
      children: [
        {
          // 区域数据汇总
          path: 'areaDataCollect',
          component: Pages.SpecialtyConAreaDataCollect
        }, {
          // 专业设置总数
          path: 'majorSettingNum',
          component: Pages.SpecialtyConMajorSettingNum
        }, {
          // 当前招生专业数
          path: 'enrolStuMajorNum',
          component: Pages.SpecialtyConEnrolStuMajorNum
        }, {
          // 学校专业开设平均数
          path: 'schoolMajorNumAvg',
          component: Pages.SpecialtyConSchoolMajorNumAvg
        }, {
          // 本地重点建设专业数
          path: 'localKeyMajorNum',
          component: Pages.SpecialtyConLocalKeyMajorNum
        }, {
          // 本地重点建设专业平均数
          path: 'localKeyMajorNumAvg',
          component: Pages.SpecialtyConLocalKeyMajorNumAvg
        }, {
          // 分专业大类学生数
          path: 'majorStudnetNum',
          component: Pages.SpecialtyConMajorStudnetNum
        }, {
          // 本地专业平均学生数
          path: 'localMajorStudentNumAvg',
          component: Pages.SpecialtyConLocalMajorStudentNumAvg
        }, {
          // 上网课程总数
          path: 'onLineCourseNum',
          component: Pages.SpecialtyConOnLineCourseNum
        }, {
          // 校本自编教材总数
          path: 'selfMadeBookNum',
          component: Pages.SpecialtyConSelfMadeBookNum
        }, {
          // 精品课程总数
          path: 'qualityCourseNum',
          component: Pages.SpecialtyConQualityCourseNum
        }, {
          // 精品课程平均数
          path: 'qualityCourseNumAvg',
          component: Pages.SpecialtyConQualityCourseNumAvg
        }, {
          // 国控专业数
          path: 'stateControlMajorNum',
          component: Pages.SpecialtyConStateControlMajorNum
        }, {
          // 国控专业在校生数
          path: 'stateControlMajorStudentNum',
          component: Pages.SpecialtyConStateControlMajorStudentNum
        }, {
          // 目录外专业数
          path: 'outDirectoryMajorNum',
          component: Pages.SpecialtyConOutDirectoryMajorNum
        }, {
          // 目录外专业在校生数
          path: 'outDirectoryMajorStudentNum',
          component: Pages.SpecialtyConOutDirectoryMajorStudentNum
        }, {
          // 涉农专业数
          path: 'agricultureRelatedMajorNum',
          component: Pages.SpecialtyConAgricultureRelatedMajorNum
        }, {
          // 涉农专业在校生数
          path: 'agricultureRelatedMajorStudentNum',
          component: Pages.SpecialtyConAgricultureRelatedMajorStudentNum
        }, {
          // 各专业学生数
          path: 'majorDetailStudentNum',
          component: Pages.SpecialtyConMajorDetailStudentNum
        }
      ]
    },
    {
      //教师情况
      path: '/teacher',
      component: Pages.TeacherIndex,
      redirect: '/teacher/areaDataCollect',
      children: [
        {
          // 区域数据汇总
          path: 'areaDataCollect',
          component: Pages.TeacherAreaDataCollect
        }, {
          // "双师型"教师占专业教师比例
          path: 'doubleTeacherRate',
          component: Pages.TeacherDoubleTeacherRate
        }, {
          // 按学历分布的专任教师总数
          path: 'educationFullTimeTeacherNum',
          component: Pages.TeacherEducationFullTimeTeacherNum
        }, {
          // 研究生学历或硕士以上学位教师占专任教师比例
          path: 'educationFullTimeTeacherRate',
          component: Pages.TeacherEducationFullTimeTeacherRate
        }, {
          // 校内专任教师总数
          path: 'fullTimeTeacherNum',
          component: Pages.TeacherFullTimeTeacherNum
        }, {
          // 按专业技术职务分布的专任教师总数
          path: 'occupationFullTimeTeacherNum',
          component: Pages.TeacherOccupationFullTimeTeacherNum
        }, {
          // 兼职(课)教师总数
          path: 'partTimeTeacherNum',
          component: Pages.TeacherPartTimeTeacherNum
        }, {
          // 兼职(课)教师与专任教师比值
          path: 'partTimeTeacherRate',
          component: Pages.TeacherPartTimeTeacherRate
        }, {
          // 校内专业教师总数
          path: 'professionalTeacherNum',
          component: Pages.TeacherProfessionalTeacherNum
        },{
          // 专业教师占专任教师比例
          path: 'professionalTeacherRate',
          component: Pages.TeacherProfessionalTeacherRate
        },{
          // 高级职称教师占专任教师比例
          path: 'seniorTitleFullTimeTeacherRate',
          component: Pages.TeacherSeniorTitleFullTimeTeacherRate
        },{
          // 平均生师比
          path: 'studentTeacherRate',
          component: Pages.TeacherStudentTeacherRate
        },{
          // 教职工总数
          path: 'teacherNum',
          component: Pages.TeacherTeacherNum
        },
      ]
    },
    {
      path: '/student',
      component: Pages.StudentIndex,
      redirect: '/student/dataCollection',
      children: [
        {
          path: 'dataCollection',
          component: Pages.StudentDataCollection
        },
        {
          path: 'allDaySchool',
          component: Pages.AlldaySchoolStudent
        },
        {
          path: 'notAllDaySchool',
          component: Pages.NotAllDaySchoolStudent
        },
        {
          path: 'localVocational',
          component: Pages.LocalVocationalStudent
        },
        {
          path: 'newMigrantWorker',
          component: Pages.NewMigrantWorker
        },
        {
          path: 'lossRatio',
          component: Pages.LossRatio
        },
        {
          path: 'schoolLevel',
          component: Pages.SchoolLevel
        },
        {
          path: 'studentAward',
          component: Pages.StudentAward
        },
        {
          path: 'enrollNum',
          component: Pages.ActualEnrollNum
        },
        {
          path: 'graduateNum',
          component: Pages.GraduateNum
        },
        {
          path: 'employmentRate',
          component: Pages.EmploymentRate
        },
        {
          path: 'counterpartRate',
          component: Pages.CounterpartRate
        },
        {
          path: 'startingSalary',
          component: Pages.StartingSalary
        },
        {
          path: 'companySatisfy',
          component: Pages.CompanySatisfySituation
        },
        {
          path: 'enjorScholarship',
          component: Pages.EnjorScholarship
        },
        {
          path: 'enjorScholarshipNum',
          component: Pages.EnjorScholarshipNum
        },
        {
          path: 'postInternshipStuNum',
          component: Pages.PostInternshipStuNum
        }
        ]
    },
    {
      path: '/schoolCooperation',
      component: Pages.SchoolCooperation,
      redirect: '/schoolCooperation/dataCollection',
      children: [
        {
          path: 'dataCollection',
          component: Pages.DataCollection
        },
        {
          path: 'coopeCompany',
          component: Pages.CoopeCompany
        },
        {
          path: 'schoolCoope',
          component: Pages.SchoolCoope
        },
        {
          path: 'orderTrain',
          component: Pages.OrderTrain
        },
        {
          path: 'togetherWork',
          component: Pages.TogetherWork
        },
        {
          path: 'shoolCoursesNum',
          component: Pages.ShoolCoursesNum
        },
        {
          path: 'togetherTextbookNum',
          component: Pages.TogetherTextbookNum
        },
        {
          path: 'schoolTextbookNum',
          component: Pages.SchoolTextbookNum
        },
        {
          path: 'coopeTeacherNum',
          component: Pages.CoopeTeacherNum
        },
        {
          path: 'coopePracticeNum',
          component: Pages.CoopePracticeNum
        },
        {
          path: 'coopeGrad',
          component: Pages.CoopeGrad
        }, {
          path: 'coopeCompanySet',
          component: Pages.CoopeCompanySet
        }

      ]
    },
    {
      path: '/socialWork',
      component: Pages.SocialWork,
      redirect: '/socialWork/areaDataCollect',
      children: [
        {
          path: 'areaDataCollect',
          component: Pages.SocialWorkMenu1
        },
        {
          path: 'shortTechnicalSkillsTraining',
          component: Pages.SocialWorkMenu2
        },
        {
          path: 'developProfSkillsIdentification',
          component: Pages.SocialWorkMenu3
        },
        {
          path: 'developTechnicalTraining',
          component: Pages.SocialWorkMenu4
        },
        {
          path: 'trainingStaffForBusinessYear',
          component: Pages.SocialWorkMenu5
        },
        {
          path: 'technicalMonopolyForFulltimeTeachers',
          component: Pages.SocialWorkMenu6
        }
      ]
    },
    {
      path: '/diagnostic',
      component: Pages.DiagnosticIndex,
      redirect: '/diagnostic/specialtySelectView',
      children: [
        {
          // 专业选择机制可视化分析
          path: 'specialtySelectView',
          component: Pages.SpecialtySelectView
        }
      ]
    },

    {
      path: '/backManage',
      component: Pages.BackManage
    }
  ],
  linkActiveClass: 'active'
})
