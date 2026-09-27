using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CollFly
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
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddHttpContextAccessor();

            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            //services.AddMvc(options => options.EnableEndpointRouting = false);
            //services.AddControllers(options => options.EnableEndpointRouting = false);
            services.AddMvc(options => options.EnableEndpointRouting = false);

            services.AddSession(opts =>
            {
                opts.Cookie.IsEssential = true; // make the session cookie Essential
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseSession();
            

            /*app.UseEndpoints(endpoints =>
            {
                //endpoints.MapControllers();
                //endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}");
                //endpoints.MapControllerRoute("areas", "{area=exists}/{controller=Usuario}/{action=Login}");
            });*/

            //app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

            app.UseMvc(routes =>
            {
                routes.MapRoute("default", "/{controller=Home}/{action=Index}");
                /*routes.MapRoute(
                    name: "default",
                    template: "{area=Seguridad}/{controller=Usuario}/{action=Login}"
                  );

                routes.MapRoute(
                    name: "areas",
                    template: "{area=exists}/{controller=Usuario}/{action=Login}"
                  );    */            
            });


        }
    }
}
