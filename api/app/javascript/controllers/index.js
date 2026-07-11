import { application } from "controllers/application"

import CalendarController from "controllers/calendar_controller"
import ChartBuilderController from "controllers/chart_builder_controller"
import DisclosureController from "controllers/disclosure_controller"
import FamilyTreeController from "controllers/family_tree_controller"
import EditorController from "controllers/editor_controller"
import FlashController from "controllers/flash_controller"
import FormValidityController from "controllers/form_validity_controller"
import ModalController from "controllers/modal_controller"
import PasswordStrengthController from "controllers/password_strength_controller"
import PasswordVisibilityController from "controllers/password_visibility_controller"
import SearchController from "controllers/search_controller"
import SidebarController from "controllers/sidebar_controller"
import TableFilterController from "controllers/table_filter_controller"
import TableSortController from "controllers/table_sort_controller"

application.register("calendar",           CalendarController)
application.register("chart-builder",      ChartBuilderController)
application.register("disclosure",         DisclosureController)
application.register("family-tree",        FamilyTreeController)
application.register("editor",             EditorController)
application.register("flash",              FlashController)
application.register("form-validity",      FormValidityController)
application.register("modal",              ModalController)
application.register("password-strength",   PasswordStrengthController)
application.register("password-visibility", PasswordVisibilityController)
application.register("search",             SearchController)
application.register("sidebar",            SidebarController)
application.register("table-filter",       TableFilterController)
application.register("table-sort",         TableSortController)
