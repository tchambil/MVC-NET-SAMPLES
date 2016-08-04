using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using eInspection.Authorization;
using eInspection.MultiTenancy;

namespace eInspection.Web.Controllers
{
    [AbpMvcAuthorize(PermissionNames.Pages_Tenants)]
    public class TenantsController : eInspectionControllerBase
    {
        private readonly ITenantAppService _tenantAppService;

        public TenantsController(ITenantAppService tenantAppService)
        {
            _tenantAppService = tenantAppService;
        }

        public ActionResult Index()
        {
            var output = _tenantAppService.GetTenants();
            return View(output);
        }
        
    }
}
