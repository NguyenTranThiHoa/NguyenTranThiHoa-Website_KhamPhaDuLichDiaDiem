using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Logging;

namespace WebDoAn2.HealthChecks
{
    public class ApiHealthCheck : IHealthCheck
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<ApiHealthCheck> _logger;

        public ApiHealthCheck(HttpClient httpClient, ILogger<ApiHealthCheck> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogInformation("Checking API health...");
                var response = await _httpClient.GetAsync("http://localhost:5084/api/Book", cancellationToken);
                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation("API is healthy.");
                    return HealthCheckResult.Healthy("API is healthy.");
                }

                _logger.LogWarning($"API returned status code {response.StatusCode}");
                return HealthCheckResult.Degraded($"API returned status code {response.StatusCode}.");
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "API health check failed.");
                return HealthCheckResult.Unhealthy("API is unhealthy.", ex);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred during API health check.");
                return HealthCheckResult.Unhealthy("An unexpected error occurred.", ex);
            }
        }
    }
}
