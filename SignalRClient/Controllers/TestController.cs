using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SignalRClient.Controllers
{
    public class TestController : Controller
    {
        [Route("test")]
        public IActionResult Index()
        {
            return View();
        }
    }
}