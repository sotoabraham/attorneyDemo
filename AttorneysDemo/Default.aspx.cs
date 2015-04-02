using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Services;
using Newtonsoft.Json;
using System.Dynamic;
using System.Web.Services;

namespace AttorneysDemo
{
    public partial class Default : Page
    {   
        [WebMethod]
        public static string webMethodTest(DateTime fromDate, DateTime toDate) 
        { 
            //do business data here,
            //access a DB, retrieve data
            //serialize data to json to send back to AJAX request
            List<object> salesList = new List<object>();
            List<object> listOfSalesList = new List<object>();

            Random random = new Random();

            for (int i = 0; i < 15; i++)
			{
			    dynamic magicalObject = new ExpandoObject(); 
                magicalObject.Day = i; 
                magicalObject.SalesVolume = random.Next(1, 1000);
                magicalObject.Commissions = random.Next(1, 1000);
                salesList.Add(magicalObject); 
			}

            listOfSalesList.Add(salesList);

           string json = JsonConvert.SerializeObject(salesList);
           return json;
        }

    }
}