using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using eInspection.MultiTenancy.Dto;

namespace eInspection.MultiTenancy
{
    public interface ITenantAppService : IApplicationService
    {
        ListResultOutput<TenantListDto> GetTenants();

        Task CreateTenant(CreateTenantInput input);
    }
}
