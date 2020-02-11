using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SignalRServer.Hubs;
using System.Threading.Tasks;

namespace SignalRClient
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //When we use Bearer authorization the bloew configuration is require 
            services.AddAuthentication()
                .AddJwtBearer(options =>
                {
                    options.Events = new Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            if (string.IsNullOrEmpty(accessToken) == false)
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddControllers();
            services.AddRazorPages();


            ////For Redis signaR 
            //services.AddSignalR().AddRedis(options =>
            //{
            //    options.Configuration.ClientName = "SignalR";
            //});


            //For Azure SignalR
            services.AddSignalR().AddAzureSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();
            //app.UseSignalR(config => {
            //    config.MapHub<MessageHub>("/messages");
            //});


            //This is only for Azure signalR service
            app.UseAzureSignalR(config =>
            {
                config.MapHub<MessageHub>("/messages");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapRazorPages();
                //endpoints.MapHub<MessageHub>("/messages");   // Need for regular and Redis SignalR but not for Azure SignalR
            });

        }
    }
}
