// 一级路由配置
import Home from '../pages/home.vue'
import SchoolPro from '../pages/schoolPro.vue'
import FundsInput from '../pages/fundsInput.vue'
import SchoolCondition from '../pages/schoolCondition.vue'
import SpecialtyCon from '../pages/specialtyCon.vue'
import SchoolSituationn from '../pages/schoolSituationn.vue'
import StudentSituationn from '../pages/studentSituationn.vue'
import SchoolCooperation from '../pages/schoolCooperation.vue'
import SocialWork from '../pages/socialWork.vue'
import DiagnosticIndex from '../pages/diagnostic/index.vue'
import BackManage from '../pages/backManage.vue'
// 首页二级路由配置
import BasicSituation from '../pages/home/basicSituation.vue'
import SchoolFunding from '../pages/home/schoolFunding.vue'
import Majors from '../pages/home/majors.vue'
import TeachStaff from '../pages/home/teachStaff.vue'
import StudentInf from '../pages/home/studentInf.vue'
import TeachDevice from '../pages/home/teachDevice.vue'
// 学校情况二级路由配置
import SchoolProAreaDataCollect from '../pages/schoolPro/areaDataCollect.vue'
import SchoolProTotal from '../pages/schoolPro/total.vue'
import SchoolProReportedTotal from '../pages/schoolPro/reportedTotal.vue'
import SchoolProGroupByCategoryT from '../pages/schoolPro/groupByCategoryT.vue'
import SchoolProGroupByGradeT from '../pages/schoolPro/groupByGradeT.vue'
import SchoolProGroupByOrganizersT from '../pages/schoolPro/groupByOrganizersT.vue'
import SchoolProGroupBySchoolTypeT from '../pages/schoolPro/groupBySchoolTypeT.vue'
import SchoolProGroupByRectifyConcT from '../pages/schoolPro/groupByRectifyConcT.vue'
// 经费投入二级路由配置
import RegeionDataSum from '../pages/fundsInput/regeionDataSum.vue'
import IncomeTotal from '../pages/fundsInput/incomeTotal.vue'
import IncomeTotalAvg from '../pages/fundsInput/incomeTotalAvg.vue'
import SchoolIncomePer from '../pages/fundsInput/schoolIncomePer.vue'
import TuitionIncomePer from '../pages/fundsInput/tuitionIncomePer.vue'
import StudentIncomeAvg from '../pages/fundsInput/studentIncomeAvg.vue'
import ExpendTotal from '../pages/fundsInput/expendTotal.vue'
import ExpendTotalAvg from '../pages/fundsInput/expendTotalAvg.vue'
import SchoolExpendPer from '../pages/fundsInput/schoolExpendPer.vue'
import TeachExpendPer from '../pages/fundsInput/teachExpendPer.vue'
import EnjorScholarship from '../pages/fundsInput/enjorScholarship.vue'
// 办学条件
import SchoolConditionSum from '../pages/schoolCondition/schoolConditionSum.vue'
import CoverTotalArea from '../pages/schoolCondition/coverTotalArea.vue'
import CoverTotalAreaAvgSch from '../pages/schoolCondition/coverTotalAreaAvgSch.vue'
import CoverTotalAreaAvgStu from '../pages/schoolCondition/coverTotalAreaAvgStu.vue'
import BuildTotalArea from '../pages/schoolCondition/buildTotalArea.vue'
import BuildTotalAreaAvgSch from '../pages/schoolCondition/buildTotalAreaAvgSch.vue'
import TeachAdminTotalArea from '../pages/schoolCondition/teachAdminTotalArea.vue'
import RightBuildAreaAvgStu from '../pages/schoolCondition/rightBuildAreaAvgStu.vue'
import DormitoryAreaAvgStu from '../pages/schoolCondition/dormitoryAreaAvgStu.vue'
import BookNumAvgSch from '../pages/schoolCondition/bookNumAvgSch.vue'
import BookNumAvgStu from '../pages/schoolCondition/bookNumAvgStu.vue'
import YearBookEntryAvgStu from '../pages/schoolCondition/yearBookEntryAvgStu.vue'
import MediaRoomNumAvgSch from '../pages/schoolCondition/mediaRoomNumAvgSch.vue'
import ComputerNumAvgStu from '../pages/schoolCondition/computerNumAvgStu.vue'
import TeachEquipAvgSch from '../pages/schoolCondition/teachEquipAvgSch.vue'
import TeachEquipAvgStu from '../pages/schoolCondition/teachEquipAvgStu.vue'
import InschTrainBaseAvgSch from '../pages/schoolCondition/inschTrainBaseAvgSch.vue'
import OutschTrainBaseAvgSch from '../pages/schoolCondition/outschTrainBaseAvgSch.vue'
import InschTrainStationAvgSch from '../pages/schoolCondition/inschTrainStationAvgSch.vue'
import InschBaseAreaAvgSch from '../pages/schoolCondition/inschBaseAreaAvgSch.vue'

// 学生情况
import StudentIndex from '../pages/student'
import StudentDataCollection from '../pages/student/studentDataCollection'
import AlldaySchoolStudent from '../pages/student/allDaySchoolStudent'
import NotAllDaySchoolStudent from '../pages/student/notAllDaySchoolStudent'
import LocalVocationalStudent from '../pages/student/localVocationalStudent'
import NewMigrantWorker from '../pages/student/newMigrantWorkers'
import LossRatio from '../pages/student/lossRatio'
import SchoolLevel from '../pages/student/schoolLevel'
import StudentAward from '../pages/student/studentAwardSituation'
import ActualEnrollNum from '../pages/student/actualEnrollNum'
import GraduateNum from '../pages/student/graduateNum'
import EmploymentRate from '../pages/student/employmentRate'
import CounterpartRate from '../pages/student/counterpartRate'
import StartingSalary from '../pages/student/startingSalary'
import CompanySatisfySituation from '../pages/student/companySatisfySituation'
import EnjorScholarshipNum from '../pages/student/enjorScholarshipNum'
import PostInternshipStuNum from '../pages/student/postInternshipStuNum'
// 专业建设情况
import SpecialtyConIndex from '../pages/specialtyCon/index.vue'
import SpecialtyConAreaDataCollect from './specialtyCon/areaDataCollect.vue'
import SpecialtyConMajorSettingNum from './specialtyCon/majorSettingNum.vue'
import SpecialtyConEnrolStuMajorNum from './specialtyCon/enrolStuMajorNum.vue'
import SpecialtyConSchoolMajorNumAvg from './specialtyCon/schoolMajorNumAvg'
import SpecialtyConLocalKeyMajorNum from './specialtyCon/localKeyMajorNum'
import SpecialtyConLocalKeyMajorNumAvg from './specialtyCon/localKeyMajorNumAvg'
import SpecialtyConOnLineCourseNum from './specialtyCon/onLineCourseNum'
import SpecialtyConSelfMadeBookNum from './specialtyCon/selfMadeBookNum'
import SpecialtyConQualityCourseNum from './specialtyCon/qualityCourseNum'
import SpecialtyConQualityCourseNumAvg from './specialtyCon/qualityCourseNumAvg'
import SpecialtyConStateControlMajorNum from './specialtyCon/stateControlMajorNum'
import SpecialtyConStateControlMajorStudentNum from './specialtyCon/stateControlMajorStudentNum'
import SpecialtyConOutDirectoryMajorNum from './specialtyCon/outDirectoryMajorNum'
import SpecialtyConOutDirectoryMajorStudentNum from './specialtyCon/outDirectoryMajorStudentNum'
import SpecialtyConAgricultureRelatedMajorNum from './specialtyCon/agricultureRelatedMajorNum'
import SpecialtyConAgricultureRelatedMajorStudentNum from './specialtyCon/agricultureRelatedMajorStudentNum'
import SpecialtyConMajorDetailStudentNum from './specialtyCon/majorDetailStudentNum'

// 教师情况
import TeacherIndex from '../pages/teacher/index'
import TeacherAreaDataCollect from '../pages/teacher/areaDataCollect'
import TeacherDoubleTeacherRate from '../pages/teacher/doubleTeacherRate'
import TeacherEducationFullTimeTeacherNum from '../pages/teacher/educationFullTimeTeacherNum'
import TeacherEducationFullTimeTeacherRate from '../pages/teacher/educationFullTimeTeacherRate'
import TeacherFullTimeTeacherNum from '../pages/teacher/fullTimeTeacherNum'
import TeacherOccupationFullTimeTeacherNum from '../pages/teacher/occupationFullTimeTeacherNum'
import TeacherPartTimeTeacherNum from '../pages/teacher/partTimeTeacherNum'
import TeacherPartTimeTeacherRate from '../pages/teacher/partTimeTeacherRate'
import TeacherProfessionalTeacherNum from '../pages/teacher/professionalTeacherNum'
import TeacherProfessionalTeacherRate from '../pages/teacher/professionalTeacherRate'
import TeacherSeniorTitleFullTimeTeacherRate from '../pages/teacher/seniorTitleFullTimeTeacherRate'
import TeacherStudentTeacherRate from '../pages/teacher/studentTeacherRate'
import TeacherTeacherNum from '../pages/teacher/teacherNum'

// 校企合作
import DataCollection from '../pages/schoolCooperation/dataCollection'
import CoopeCompany from './schoolCooperation/coopeCompany.vue'
import SchoolCoope from './schoolCooperation/schoolCoope.vue'
import OrderTrain from './schoolCooperation/orderTrain.vue'
import TogetherWork from './schoolCooperation/togetherWork.vue'
import ShoolCoursesNum from './schoolCooperation/shoolCoursesNum'
import TogetherTextbookNum from './schoolCooperation/togetherTextbookNum'
import SchoolTextbookNum from './schoolCooperation/schoolTextbookNum.vue'
import CoopeTeacherNum from './schoolCooperation/coopeTeacherNum.vue'
import CoopePracticeNum from './schoolCooperation/coopePracticeNum.vue'
import CoopeGrad from './schoolCooperation/coopeGrad'
import CoopeCompanySet from './schoolCooperation/coopeCompanySet'
import SpecialtyConMajorStudnetNum from './specialtyCon/majorStudnetNum'
import SpecialtyConLocalMajorStudentNumAvg from './specialtyCon/localMajorStudentNumAvg'

// 社会服务
import SocialWorkMenu1 from '../pages/socialWork/areaDataCollect.vue'
import SocialWorkMenu2 from '../pages/socialWork/shortTechnicalSkillsTraining.vue'
import SocialWorkMenu3 from '../pages/socialWork/developProfSkillsIdentification.vue'
import SocialWorkMenu4 from '../pages/socialWork/developTechnicalTraining.vue'
import SocialWorkMenu5 from '../pages/socialWork/trainingStaffForBusinessYear.vue'
import SocialWorkMenu6 from '../pages/socialWork/technicalMonopolyForFulltimeTeachers.vue'

// 专业诊断二级路由
import SpecialtySelectView from './diagnostic/specialtySelectView.vue'

export {
  // 一级路由配置
  Home,
  SchoolPro,
  SchoolCondition,
  FundsInput,
  SpecialtyCon,
  SchoolSituationn,
  StudentSituationn,
  SchoolCooperation,
  SocialWork,
  DiagnosticIndex,
  BackManage,
  // 首页二级路由配置
  BasicSituation,
  SchoolFunding,
  Majors,
  TeachStaff,
  StudentInf,
  TeachDevice,
  // 学校情况
  SchoolProAreaDataCollect,
  SchoolProTotal,
  SchoolProReportedTotal,
  SchoolProGroupByCategoryT,
  SchoolProGroupByGradeT,
  SchoolProGroupByOrganizersT,
  SchoolProGroupBySchoolTypeT,
  SchoolProGroupByRectifyConcT,
  // 经费投入
  RegeionDataSum,
  IncomeTotal,
  IncomeTotalAvg,
  SchoolIncomePer,
  TuitionIncomePer,
  StudentIncomeAvg,
  ExpendTotal,
  ExpendTotalAvg,
  SchoolExpendPer,
  TeachExpendPer,
  EnjorScholarship,
  // 办学条件
  SchoolConditionSum,
  CoverTotalArea,
  CoverTotalAreaAvgSch,
  CoverTotalAreaAvgStu,
  BuildTotalArea,
  BuildTotalAreaAvgSch,
  TeachAdminTotalArea,
  RightBuildAreaAvgStu,
  DormitoryAreaAvgStu,
  BookNumAvgSch,
  BookNumAvgStu,
  YearBookEntryAvgStu,
  MediaRoomNumAvgSch,
  ComputerNumAvgStu,
  TeachEquipAvgSch,
  TeachEquipAvgStu,
  InschTrainBaseAvgSch,
  OutschTrainBaseAvgSch,
  InschTrainStationAvgSch,
  InschBaseAreaAvgSch,
  // 学生情况
  StudentIndex,
  StudentDataCollection,
  AlldaySchoolStudent,
  NotAllDaySchoolStudent,
  LocalVocationalStudent,
  NewMigrantWorker,
  LossRatio,
  SchoolLevel,
  StudentAward,
  ActualEnrollNum,
  GraduateNum,
  EmploymentRate,
  CounterpartRate,
  StartingSalary,
  CompanySatisfySituation,
  EnjorScholarshipNum,
  PostInternshipStuNum,

  // 专业建设
  SpecialtyConIndex,
  SpecialtyConAreaDataCollect,
  SpecialtyConMajorSettingNum,
  SpecialtyConEnrolStuMajorNum,
  SpecialtyConSchoolMajorNumAvg,
  SpecialtyConLocalKeyMajorNum,
  SpecialtyConLocalKeyMajorNumAvg,
  SpecialtyConOnLineCourseNum,
  SpecialtyConSelfMadeBookNum,
  SpecialtyConQualityCourseNum,
  SpecialtyConQualityCourseNumAvg,
  SpecialtyConStateControlMajorNum,
  SpecialtyConStateControlMajorStudentNum,
  SpecialtyConOutDirectoryMajorNum,
  SpecialtyConOutDirectoryMajorStudentNum,
  SpecialtyConAgricultureRelatedMajorNum,
  SpecialtyConAgricultureRelatedMajorStudentNum,
  SpecialtyConMajorDetailStudentNum,

  // 教师情况
  TeacherIndex,
  TeacherAreaDataCollect,
  TeacherDoubleTeacherRate,
  TeacherEducationFullTimeTeacherNum,
  TeacherEducationFullTimeTeacherRate,
  TeacherFullTimeTeacherNum,
  TeacherOccupationFullTimeTeacherNum,
  TeacherPartTimeTeacherNum,
  TeacherPartTimeTeacherRate,
  TeacherProfessionalTeacherNum,
  TeacherProfessionalTeacherRate,
  TeacherSeniorTitleFullTimeTeacherRate,
  TeacherStudentTeacherRate,
  TeacherTeacherNum,

  // 校企合作
  DataCollection,
  CoopeCompany,
  SchoolCoope,
  OrderTrain,
  TogetherWork,
  ShoolCoursesNum,
  TogetherTextbookNum,
  SchoolTextbookNum,
  CoopeTeacherNum,
  CoopePracticeNum,
  CoopeGrad,
  CoopeCompanySet,

  // 社会服务
  SocialWorkMenu1,
  SocialWorkMenu2,
  SocialWorkMenu3,
  SocialWorkMenu4,
  SocialWorkMenu5,
  SocialWorkMenu6,

  // 专业诊断二级路由
  SpecialtySelectView,

  // SpecialtyConLocalKeyMajorNumAvg,
  SpecialtyConMajorStudnetNum,
  SpecialtyConLocalMajorStudentNumAvg
}
