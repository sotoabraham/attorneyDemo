<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="WebForm1.aspx.cs" Inherits="AttorneysDemo.WebForm1" %>

<asp:Content ID="headerContent" ContentPlaceHolderID="MainContent" runat="server">

    <script src="Scripts/d3.min.js"></script>
    <script src="Scripts/nv.d3.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/daterangepicker.js"></script>
    <script src="Default.aspx.js"></script>
    
    <div class="page-header">
        <h1>Dashboard</h1>
    </div>
    
    <div class="row">
        <ul id="tabs" class="nav nav-tabs pull-left">                
            <li id="tab1" class="tab active"><a href="#tabContent1" data-toggle="tab"><span>Chart 1</span></a></li>
            <li id="tab2" class="tab"><a href="#tabContent2" data-toggle="tab"><span>Chart 2</span></a></li>
            <li id="tab3" class="tab"><a href="#tabContent3" data-toggle="tab"><span>Chart 3</span></a></li>
        </ul>
        
        <div class="daterange pull-right">                
            <i class="icon-calendar icon-large"></i>
            <span></span> <b class="caret"></b>
        </div>                
    </div>
            
    <div class="row">
        <div class="tab-content">
            <div id="tabContent1" class="tab-pane active">
                <div class="row-fluid">
                    <div class="span12">    
                        <h3>Tab 1 Chart</h3>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div id="tabChart1" class="chart"><svg></svg></div>
                    </div>
                </div>
                
            </div>

            <div id="tabContent2" class="tab-pane">
                <h3>Tab 2 Chart</h3> 
                <div class="row-fluid">
                    <div class="span12">
                        <div id="tabChart2" class="chart"><svg></svg></div>
                    </div>
                </div>
            </div>

            <div id="tabContent3" class="tab-pane">
                <h3>Tab 3 Chart</h3>
                <div class="row-fluid">
                    <div class="span12">
                        <div id="tabChart3" class="chart"><svg></svg></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>