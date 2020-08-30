using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRUD_APP.DataAccess.DataEntities;
using CRUD_APP.DataAccess.DataLayer;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CRUD_APP.Controllers
{
    [Route("[controller]")]
    public class CrudController : Controller
    {
        [HttpGet("getData")]
        public JsonResult GetPermisos()
        {
            return Json(MongoConnect.GetPersons().AsQueryable());
        }

        [HttpGet("getPerson/{id}")]
        public JsonResult Getpermiso(int id)
        {
            if (id == 0)
                return Json(new Person());
            else
                return Json(MongoConnect.GetPerson(id));
        }

        [HttpPost("postPerson")]
        public IActionResult PostPermiso([FromBody]Person obj)
        {
            try
            {
                if (obj.PersonId == 0)
                    MongoConnect.Insert(obj);
                else
                    MongoConnect.Update(obj);

                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletePerson/{id}")]
        public IActionResult DeletePermiso(int id)
        {
            try
            {
                MongoConnect.Delete(id);

                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
