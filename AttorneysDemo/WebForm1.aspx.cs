using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AttorneysDemo
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string webMethodTest(DateTime fromDate, DateTime toDate)
        {
            //do business data here,
            //access a DB, retrieve data
            //serialize data to json to send back to AJAX request
            List<object> salesList = new List<object>();

            for (int i = 0; i < 15; i++)
            {
                dynamic magicalObject = new ExpandoObject();
                magicalObject.Day = i;
                magicalObject.SalesVolume = new Random().Next(1, 100);
                salesList.Add(magicalObject);
            }

            //salesvolume.push({ x: 1, y: 2 });
            //salesvolume.push({ x: 2, y: 4 });
            //salesvolume.push({ x: 3, y: 1 });
            //salesvolume.push({ x: 4, y: 10 });
            //salesvolume.push({ x: 5, y: 2 });
            //salesvolume.push({ x: 6, y: 4 });
            //salesvolume.push({ x: 7, y: 1 });
            //salesvolume.push({ x: 8, y: 10 });

            //commissions.push({ x: 1, y: 5 });
            //commissions.push({ x: 2, y: 2 });
            //commissions.push({ x: 3, y: 9 });
            //commissions.push({ x: 4, y: 6 });
            //commissions.push({ x: 5, y: 5 });
            //commissions.push({ x: 6, y: 2 });
            //commissions.push({ x: 7, y: 9 });
            //commissions.push({ x: 8, y: 6 });

            string json = JsonConvert.SerializeObject(salesList);
            return json;
        }
    }
}