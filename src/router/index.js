import { createRouter, createWebHistory } from "vue-router";
import Zones from "../pages/roles/headquarters/headquarters_pages/Zones.vue";
import ZonesCreate from "../pages/roles/headquarters/headquarters_pages/ZonesCreate.vue";
import ZonesEdit from "../pages/roles/headquarters/headquarters_pages/ZonesEdit.vue";
import ZonesView from "../pages/roles/headquarters/headquarters_pages/ZonesView.vue";
import HQofficers from "../pages/roles/headquarters/headquarters_pages/HQofficers.vue";
import HqOfficersCreate from "../pages/roles/headquarters/headquarters_pages/HqOfficersCreate.vue";
import HqOfficersEdit from "../pages/roles/headquarters/headquarters_pages/HqOfficersEdit.vue";
import HqOfficersView from "../pages/roles/headquarters/headquarters_pages/HqOfficersView.vue";

// Pages (lazy-loaded)
const LandingPage = () => import("../pages/LandingPage.vue");
const RoleSelection = () => import("../pages/SelectRole.vue");

// Login pages (lazy-loaded)
const SystemAdminLogin = () => import("../pages/SystemAdminLogin.vue");
const ZonalCoordinatorLogin = () => import("../pages/ZonalCoordinatorLogin.vue");
const StateCommissionerLogin = () => import("../pages/StateCommissionerLogin.vue");
const SupervisorLogin = () => import("../pages/SupervisorLogin.vue");
const OfficerLogin = () => import("../pages/OfficerLogin.vue");
const HeadquartersLogin = () => import("../pages/HeadquartersLogin.vue");


// ==============================
// System Admin role pages
// ==============================
const SystemAdminDashboard = () =>
  import("../pages/roles/system_admin/system_admin_pages/Dashboard.vue");

const SystemAdminProfile = () =>
  import("../pages/roles/system_admin/system_admin_pages/Profile.vue");

const SystemAdminHeadquarters = () =>
  import("../pages/roles/system_admin/system_admin_pages/Headquarters.vue");

const SystemAdminHeadquartersCreate = () =>
  import("../pages/roles/system_admin/system_admin_pages/HeadquartersCreate.vue");

const SystemAdminHeadquartersView = () =>
  import("../pages/roles/system_admin/system_admin_pages/HeadquartersView.vue");

const SystemAdminHeadquartersEdit = () =>
  import("../pages/roles/system_admin/system_admin_pages/HeadquartersEdit.vue");

const SystemAdminReports = () =>
  import("../pages/roles/system_admin/system_admin_pages/Reports.vue");


// ==============================
// State Command pages
// ==============================

const StateCommandDashboard = () =>
  import("../pages/roles/state_command/state_command_pages/Dashboard.vue");
const StateCommandProfile = () =>
  import("../pages/roles/state_command/state_command_pages/Profile.vue")


// ==============================
// Divisional Coordinator pages
// ==============================

// ==============================
// Divisional Coordinator role pages
// ==============================
const DivisionalCoordinatorDashboard = () =>
  import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/Dashboard.vue");

const DivisionalCoordinatorProfile = () =>
  import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/Profile.vue");

const DivisionalCoordinatorDivisionUnits = () =>
  import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/DivisionUnits.vue");

const DivisionalCoordinatorDivisionUnitCreate = () =>
  import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/DivisionUnitCreate.vue");

const DivisionalCoordinatorDivisionUnitView = () =>
  import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/DivisionUnitView.vue");

const DivisionalCoordinatorDivisionUnitEdit = () =>
  import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/DivisionUnitEdit.vue");

// ==============================
// Headquarters role pages
// ==============================
const HeadquartersDashboard = () =>
  import("../pages/roles/headquarters/headquarters_pages/Dashboard.vue");
const HeadquartersProfile = () =>
  import("../pages/roles/headquarters/headquarters_pages/Profile.vue");
const HeadquartersZonalCoordinators = () =>
  import("../pages/roles/headquarters/headquarters_pages/ZonalCoordinators.vue");
const HeadquartersZonalCoordinatorsCreate = () =>
  import("../pages/roles/headquarters/headquarters_pages/ZonalCoordinatorsCreate.vue");
const HeadquartersZonalCoordinatorsView = () =>
  import("../pages/roles/headquarters/headquarters_pages/ZonalCoordinatorsView.vue");
const HeadquartersZonalCoordinatorsEdit = () =>
  import("../pages/roles/headquarters/headquarters_pages/ZonalCoordinatorsEdit.vue");
const HeadquartersZones = () =>
  import("../pages/roles/headquarters/headquarters_pages/Zones.vue");
const HeadquartersZonesEdit = () =>
  import("../pages/roles/headquarters/headquarters_pages/ZonesEdit.vue");
const HeadquartersZonesView = () =>
  import("../pages/roles/headquarters/headquarters_pages/ZonesView.vue");
const HeadquartersZonesCreate = () =>
  import("../pages/roles/headquarters/headquarters_pages/ZonesCreate.vue");
const HeadquartersHqOfficers = () =>
  import("../pages/roles/headquarters/headquarters_pages/HQofficers.vue");
const HeadquartersHqOfficersCreate = () =>
  import("../pages/roles/headquarters/headquarters_pages/HqOfficersCreate.vue");
const HeadquartersHqOfficersEdit = () =>
  import("../pages/roles/headquarters/headquarters_pages/HqOfficersEdit.vue");
const HeadquartersHqOfficersView = () =>
  import("../pages/roles/headquarters/headquarters_pages/HqOfficersView.vue");
const DivisionsLocations = () =>
  import("../pages/roles/headquarters/headquarters_pages/DivisionsLocations.vue");
const StaffDirectory = () =>
  import("../pages/roles/headquarters/headquarters_pages/StaffDirectory.vue");
const HeadquartersReports = () =>
  import("../pages/roles/headquarters/headquarters_pages/Reports.vue");
const HeadquartersCriminalRecords = () =>
  import("../pages/roles/headquarters/headquarters_pages/CriminalRecords.vue");
const HeadquartersCrimeAnalytics = () =>
  import("../pages/roles/headquarters/headquarters_pages/CrimeAnalytics.vue");
const HeadquartersIncidentReports = () =>
  import("../pages/roles/headquarters/headquarters_pages/IncidentReports.vue");


// ==============================
// Zonal Coordinator role pages
// ==============================

const ZonalCoordinatorDashboard = () =>
  import("../pages/roles/zonal coordniator/zonal_coordinator_pages/Dashboard.vue");
const ZonalCoordinatorProfile = () =>
  import("../pages/roles/zonal coordniator/zonal_coordinator_pages/Profile.vue");


const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
    meta: { title: "NCRMS" },
  },
  {
    path: "/roles",
    name: "RoleSelection",
    component: RoleSelection,
    meta: { title: "Select Role - NCRMS" },
  },
  {
    path: "/portal",
    name: "PortalSelect",
    component: () => import("../pages/PortalSelect.vue"),
  },

  // ==============================
  // Role-specific login routes
  // ==============================
  {
    path: "/login/system-admin",
    name: "SystemAdminLogin",
    component: SystemAdminLogin,
    meta: { title: "System Administrator Login - NCRMS" },
  },
  {
    path: "/login/zonal-coordinator",
    name: "ZonalCoordinatorLogin",
    component: ZonalCoordinatorLogin,
    meta: { title: "Zonal Coordinator Login - NCRMS" },
  },
  {
    path: "/login/state-commissioner",
    name: "StateCommissionerLogin",
    component: StateCommissionerLogin,
    meta: { title: "State Commissioner Login - NCRMS" },
  },
  {
    path: "/login/supervisor",
    name: "SupervisorLogin",
    component: SupervisorLogin,
    meta: { title: "Supervisor Login - NCRMS" },
  },
  {
    path: "/login/officer",
    name: "OfficerLogin",
    component: OfficerLogin,
    meta: { title: "Officer Login - NCRMS" },
  },
  {
    path: "/login/headquarters",
    name: "HeadquartersLogin",
    component: HeadquartersLogin,
    meta: { title: "Headquarters Login - NCRMS" },
  },

  // ==============================
  // System Admin routes
  // ==============================
  {
    path: "/system-admin",
    redirect: "/system-admin/dashboard",
  },
  {
    path: "/system-admin/dashboard",
    name: "SystemAdminDashboard",
    component: SystemAdminDashboard,
    meta: { title: "System Admin Dashboard - NCRMS" },
  },
  {
    path: "/system-admin/profile",
    name: "SystemAdminProfile",
    component: SystemAdminProfile,
    meta: { title: "System Admin Profile - NCRMS" },
  },
  {
    path: "/system-admin/headquarters",
    name: "SystemAdminHeadquarters",
    component: SystemAdminHeadquarters,
    meta: { title: "Zonal Admins - NCRMS" },
  },
  {
    path: "/system-admin/headquarters/new",
    name: "SystemAdminHeadquartersCreate",
    component: SystemAdminHeadquartersCreate,
    meta: { title: "Add Headquarter - NCRMS" },
  },
  {
    path: "/system-admin/headquarters/:id",
    name: "SystemAdminHeadquartersView",
    component: SystemAdminHeadquartersView,
    meta: { title: "View Headquarter - NCRMS" },
  },
  {
    path: "/system-admin/headquarters/:id/edit",
    name: "SystemAdminHeadquartersEdit",
    component: SystemAdminHeadquartersEdit,
    meta: { title: "Edit Headquarter - NCRMS" },
  },
  {
    path: "/system-admin/reports",
    name: "SystemAdminReports",
    component: SystemAdminReports,
    meta: { title: "Reports - NCRMS" },
  },

  // ==============================
  // Headquarters routes
  // ==============================
  {
    path: "/headquarters",
    redirect: "/headquarters/dashboard",
  },
  {
    path: "/headquarters/dashboard",
    name: "HeadquartersDashboard",
    component: HeadquartersDashboard,
    meta: { title: "Headquarters Dashboard - NCRMS" },
  },
  {
    path: "/headquarters/profile",
    name: "HeadquartersProfile",
    component: HeadquartersProfile,
    meta: { title: "Headquarters Profile - NCRMS" },
  },
  {
    path: "/headquarters/zonal-coordinators",
    name: "ZonalCoordinators",
    component: HeadquartersZonalCoordinators,
    meta: { title: "Headquarters Zonal Coordinators - NCRMS" },
  },
  {
    path: "/headquarters/zonal-coordinators-create",
    name: "ZonalCoordinatorsCreate",
    component: HeadquartersZonalCoordinatorsCreate,
    meta: { title: "Headquarters Zonal Coordinators Create - NCRMS" },
  },
  {
    path: "/headquarters/zonal-coordinators/:id",
    name: "HeadquartersZonalCoordinatorView",
    component: () => import("../pages/roles/headquarters/headquarters_pages/ZonalCoordinatorsView.vue"),
  },
  {
    path: "/headquarters/zonal-coordinators/:id/edit",
    name: "HeadquartersZonalCoordinatorEdit",
    component: () => import("../pages/roles/headquarters/headquarters_pages/ZonalCoordinatorsEdit.vue"),
  },
  {
    path: "/headquarters/forensic-evidence",
    name: "HeadquartersZonalCoordinatorForensicEvidence",
    component: () => import("../pages/roles/headquarters/headquarters_pages/ForensicEvidence.vue"),
  },
  {
    path: "/headquarters/forensic-evidence/:id",
    name: "HeadquartersForensicEvidenceView",
    component: () => import("../pages/roles/headquarters/headquarters_pages/ForensicEvidenceView.vue"),
  },
  {
    path: "/headquarters/zones",
    name: "HeadquartersZones",
    component: Zones,
  },
  {
    path: "/headquarters/zones-create",
    name: "HeadquartersZonesCreate",
    component: ZonesCreate,
  },
  {
    path: "/headquarters/zones/:id/edit",
    name: "HeadquartersZonesEdit",
    component: ZonesEdit,
  },
  {
    path: "/headquarters/zones/:id",
    name: "HeadquartersZonesView",
    component: ZonesView,
  },
  {
    path: "/headquarters/hq-officers",
    name: "HeadquartersHQofficers",
    component: HQofficers,
  },
  {
    path: "/headquarters/hq-officers-create",
    name: "HeadquartersHQofficersCreate",
    component: HqOfficersCreate,
  },
  {
    path: "/headquarters/hq-officers/:id/edit",
    name: "HeadquartersHQofficersEdit",
    component: HqOfficersEdit,
  },
  {
    path: "/headquarters/hq-officers/:id",
    name: "HeadquartersHQofficersView",
    component: HqOfficersView,
  },
  {
    path: "/headquarters/divisions-locations",
    name: "DivisionsLocations",
    component: DivisionsLocations,
  },
  {
    path: "/headquarters/staff-directory",
    name: "StaffDirectory",
    component: StaffDirectory,
  },
  {
    path: "/headquarters/reports",
    name: "HeadquartersReports",
    component: HeadquartersReports,
  },
  {
    path: "/headquarters/criminal-records",
    name: "HeadquartersCriminalRecords",
    component: HeadquartersCriminalRecords,
  },
  {
    path: "/headquarters/crime-analytics",
    name: "HeadquartersCrimeAnalytics",
    component: HeadquartersCrimeAnalytics,
  },
  {
    path: "/headquarters/incident-reports",
    name: "IncidentReports",
    component: HeadquartersIncidentReports,
  },

  // ==============================
  // Zonal Coordinator Routes
  // ==============================

  {
    path: "/zonal-coordinator/dashboard",
    name: "ZonalCoordinatorDashboard",
    component: ZonalCoordinatorDashboard,
  },
  {
    path: "/zonal-coordinator/profile",
    name: "ZonalCoordinatorProfile",
    component: ZonalCoordinatorProfile,
  },
  {
    path: "/zonal-coordinator/state-commands/:id/view",
    name: "zc-state-commands-view",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/StateCommandView.vue"),
  },
  {
    path: "/zonal-coordinator/state-commands/:id/edit",
    name: "zc-state-commands-edit",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/StateCommandEdit.vue"),
  },
  {
    path: "/zonal-coordinator/state-commands",
    name: "zc-state-commands",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/StateCommands.vue"),
  },
  {
    path: "/zonal-coordinator/state-commands-create",
    name: "zc-state-commands-create",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/StateCommandCreate.vue"),
  },
  {
    path: "/zonal-coordinator/commissioners",
    name: "zc-commissioners",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/Commissioners.vue"),
  },
  {
    path: "/zonal-coordinator/commissioners-create",
    name: "zc-commissioners-create",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/CommissionerCreate.vue"),
  },
  {
    path: "/zonal-coordinator/commissioners/:id/view",
    name: "zc-commissioners-view",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/CommissionerView.vue"),
  },
  {
    path: "/zonal-coordinator/commissioners/:id/edit",
    name: "zc-commissioners-edit",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/CommissionerEdit.vue"),
  },
  {
    path: "/zonal-coordinator/zonal-officers",
    name: "zc-zonal-officers",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/ZonalOfficers.vue"),
  },
  {
    path: "/zonal-coordinator/zonal-officers-create",
    name: "zc-zonal-officers-create",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/ZonalOfficerCreate.vue"),
  },
  {
    path: "/zonal-coordinator/zonal-officers/:id/view",
    name: "zc-zonal-officers-view",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/ZonalOfficerView.vue"),
  },
  {
    path: "/zonal-coordinator/zonal-officers/:id/edit",
    name: "zc-zonal-officers-edit",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/ZonalOfficerEdit.vue"),
  },
  {
    path: "/zonal-coordinators/divisions-locations",
    name: "DivisionsLocations",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/DivisionsLocations.vue"),
  },
  {
    path: "/zonal-coordinators/staff-directory",
    name: "StaffDirectory",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/StaffDirectory.vue"),
  },
  {
    path: "/zonal-coordinators/reports",
    name: "Reports",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/Reports.vue"),
  },
  {
    path: "/zonal-coordinators/criminal-records",
    name: "CriminalRecords",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/CriminalRecords.vue"),
  },
  {
    path: "/zonal-coordinators/incident-reports",
    name: "IncidentReports",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/IncidentReports.vue"),
  },
  {
    path: "/zonal-coordinators/crime-analytics",
    name: "CrimeAnalytics",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/CrimeAnalytics.vue"),
  },
  {
    path: "/zonal-coordinators/forensic-evidence",
    name: "ForensicEvidence",
    component: () => import("../pages/roles/zonal coordniator/zonal_coordinator_pages/ForensicEvidence.vue"),
  },
  
  
  

  // ==============================
  // State Command Routes
  // ==============================
  {
    path: "/state-command/dashboard",
    name: "StateCommandDashboard",
    component: StateCommandDashboard,
  },
  {
    path: "/state-command/profile",
    name: "StateCommandProfile",
    component: StateCommandProfile,
  },
  {
  path: "/state-command/divisions",
  name: "sc-division-units",
  component: () =>
    import("../pages/roles/state_command/state_command_pages/DivisionUnits.vue"),
},
{
  path: "/state-command/divisions-create",
  name: "sc-division-units-create",
  component: () =>
    import("../pages/roles/state_command/state_command_pages/DivisionUnitCreate.vue"),
},
{
  path: "/state-command/divisions/:id/view",
  name: "sc-division-units-view",
  component: () =>
    import("../pages/roles/state_command/state_command_pages/DivisionUnitView.vue"),
},
{
  path: "/state-command/divisions/:id/edit",
  name: "sc-division-units-edit",
  component: () =>
    import("../pages/roles/state_command/state_command_pages/DivisionUnitEdit.vue"),
},
{
  path: "/state-command/divisional-coordinators",
  name: "StateCommandDivisionalCoordinators",
  component: () => import("../pages/roles/state_command/state_command_pages/DivisionalCoordinators.vue"),
},
{
  path: "/state-command/divisional-coordinators/new",
  name: "StateCommandDivisionalCoordinatorCreate",
  component: () => import("../pages/roles/state_command/state_command_pages/DivisionalCoordinatorCreate.vue"),
},
{
  path: "/state-command/divisional-coordinators/:id",
  name: "StateCommandDivisionalCoordinatorView",
  component: () => import("../pages/roles/state_command/state_command_pages/DivisionalCoordinatorView.vue"),
},
{
  path: "/state-command/divisional-coordinators/:id/edit",
  name: "StateCommandDivisionalCoordinatorEdit",
  component: () => import("../pages/roles/state_command/state_command_pages/DivisionalCoordinatorEdit.vue"),
},
{
  path: "/state-command/divisions-locations",
  name: "DivisionsLocations",
  component: () => import("../pages/roles/state_command/state_command_pages/DivisionsLocations.vue"),
},
{
  path: "/state-command/staff-directory",
  name: "StaffDirectory",
  component: () => import("../pages/roles/state_command/state_command_pages/StaffDirectory.vue"),
},
{
  path: "/state-command/reports",
  name: "Reports",
  component: () => import("../pages/roles/state_command/state_command_pages/Reports.vue"),
},
{
  path: "/state-command/criminal-records",
  name: "CriminalRecords",
  component: () => import("../pages/roles/state_command/state_command_pages/CriminalRecords.vue"),
},
{
  path: "/state-command/incident-reports",
  name: "IncidentReports",
  component: () => import("../pages/roles/state_command/state_command_pages/IncidentReports.vue"),
},
{
  path: "/state-command/crime-analytics",
  name: "CrimeAnalytics",
  component: () => import("../pages/roles/state_command/state_command_pages/CrimeAnalytics.vue"),
},
{
  path: "/state-command/forensic-evidence",
  name: "ForensicEvidence",
  component: () => import("../pages/roles/state_command/state_command_pages/ForensicEvidence.vue"),
},

// ==============================
// Divisional Coordinator Routes
// ==============================
{
  path: "/divisional-coordinator",
  redirect: "/divisional-coordinator/dashboard",
},
{
  path: "/divisional-coordinator/dashboard",
  name: "DivisionalCoordinatorDashboard",
  component: DivisionalCoordinatorDashboard,
  meta: { title: "Divisional Coordinator Dashboard - NCRMS" },
},
{
  path: "/divisional-coordinator/profile",
  name: "DivisionalCoordinatorProfile",
  component: DivisionalCoordinatorProfile,
  meta: { title: "Divisional Coordinator Profile - NCRMS" },
},
{
  path: "/divisional-coordinator/division-units",
  name: "DivisionalCoordinatorDivisionUnits",
  component: DivisionalCoordinatorDivisionUnits,
  meta: { title: "Division Units - NCRMS" },
},
{
  path: "/divisional-coordinator/division-units/new",
  name: "DivisionalCoordinatorDivisionUnitCreate",
  component: DivisionalCoordinatorDivisionUnitCreate,
  meta: { title: "Add Division Unit - NCRMS" },
},
{
  path: "/divisional-coordinator/division-units/:id",
  name: "DivisionalCoordinatorDivisionUnitView",
  component: DivisionalCoordinatorDivisionUnitView,
  meta: { title: "View Division Unit - NCRMS" },
},
{
  path: "/divisional-coordinator/division-units/:id/edit",
  name: "DivisionalCoordinatorDivisionUnitEdit",
  component: DivisionalCoordinatorDivisionUnitEdit,
  meta: { title: "Edit Division Unit - NCRMS" },
},
// Divisional Coordinator — Division Officers
{
  path: "/divisional-coordinator/division-officers",
  name: "DivisionalCoordinatorDivisionOfficers",
  component: () =>
    import(
      "../pages/roles/divisional_coordinator/divisional_coordinator_pages/DivisionOfficers.vue"
    ),
},
{
  path: "/divisional-coordinator/division-officers/new",
  name: "DivisionalCoordinatorDivisionOfficersNew",
  component: () =>
    import(
      "../pages/roles/divisional_coordinator/divisional_coordinator_pages/DivisionUnitCreate.vue"
    ),
},
{
  path: "/divisional-coordinator/division-officers/:id",
  name: "DivisionalCoordinatorDivisionOfficersView",
  component: () =>
    import(
      "../pages/roles/divisional_coordinator/divisional_coordinator_pages/DivisionOfficersView.vue"
    ),
},
{
  path: "/divisional-coordinator/division-officers/:id/edit",
  name: "DivisionalCoordinatorDivisionOfficersEdit",
  component: () =>
    import(
      "../pages/roles/divisional_coordinator/divisional_coordinator_pages/DivisionUnitEdit.vue"
    ),
},
{
  path: "/divisional-coordinator/divisions-locations",
  name: "DivisionsLocations",
  component: () => import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/DivisionsLocations.vue"),
},
{
  path: "/divisional-coordinator/staff-directory",
  name: "StaffDirectory",
  component: () => import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/StaffDirectory.vue"),
},
{
  path: "/divisional-coordinator/reports",
  name: "Reports",
  component: () => import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/Reports.vue"),
},
{
  path: "/divisional-coordinator/criminal-records",
  name: "CriminalRecords",
  component: () => import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/CriminalRecords.vue"),
},
{
  path: "/divisional-coordinator/incident-reports",
  name: "IncidentReports",
  component: () => import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/IncidentReports.vue"),
},
{
  path: "/divisional-coordinator/crime-analytics",
  name: "CrimeAnalytics",
  component: () => import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/CrimeAnalytics.vue"),
},
{
  path: "/divisional-coordinator/forensic-evidence",
  name: "ForensicEvidence",
  component: () => import("../pages/roles/divisional_coordinator/divisional_coordinator_pages/ForensicEvidence.vue"),
},




// Officer routes (paste inside your routes array)
{
  path: "/officer/dashboard",
  name: "OfficerDashboard",
  component: () =>
    import("../pages/roles/officer/officer_pages/Dashboard.vue"),
},
{
  path: "/officer/profile",
  name: "OfficerProfile",
  component: () =>
    import("../pages/roles/officer/officer_pages/Profile.vue"),
},
{
  path: "/officer/cases",
  name: "OfficerCases",
  component: () =>
    import("../pages/roles/officer/officer_pages/Cases.vue"),
},
{
  path: "/officer/forensic-evidence",
  name: "OfficerForensicEvidence",
  component: () =>
    import("../pages/roles/officer/officer_pages/ForensicEvidence.vue"),
},
{
  path: "/officer/forensic-evidence/new",
  name: "OfficerForensicEvidenceNew",
  component: () =>
    import("../pages/roles/officer/officer_pages/ForensicEvidenceNew.vue"),
},
{
  path: "/officer/forensic-evidence/:id",
  name: "OfficerForensicEvidenceView",
  component: () =>
    import("../pages/roles/officer/officer_pages/ForensicEvidenceView.vue"),
},
{
  path: "/officer/criminal-records",
  component: () => import("../pages/roles/officer/officer_pages/CriminalRecords.vue"),
},
{
  path: "/officer/criminal-records/new",
  component: () => import("../pages/roles/officer/officer_pages/CriminalRecordsNew.vue"),
},
{
  path: "/officer/criminal-records/:id",
  component: () => import("../pages/roles/officer/officer_pages/CriminalRecordsView.vue"),
},
{
  path: "/officer/criminal-records/:id/edit",
  component: () => import("../pages/roles/officer/officer_pages/CriminalRecordsEdit.vue"),
},
{
  path: "/officer/incident-records",
  component: () => import("../pages/roles/officer/officer_pages/IncidentRecords.vue"),
},
{
  path: "/officer/incident-records/new",
  component: () => import("../pages/roles/officer/officer_pages/IncidentRecordNew.vue"),
},
{
  path: "/officer/incident-records/:id",
  component: () => import("../pages/roles/officer/officer_pages/IncidentRecordView.vue"),
},
{
  path: "/officer/incident-records/:id/edit",
  component: () => import("../pages/roles/officer/officer_pages/IncidentRecordEdit.vue"),
},





  // ==============================
  // Optional placeholders
  // ==============================
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../pages/ForgotPassword.vue"),
    meta: { title: "Forgot Password - NCRMS" },
  },

  // ==============================
  // Fallback
  // ==============================
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title || "NCRMS";
});

export default router;
