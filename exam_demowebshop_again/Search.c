Search()
{

	lr_start_transaction("search");

	web_add_header("Accept-Language", 
		"en-GB,en;q=0.9");

	web_url("ajax_loader_small.gif", 
		"URL=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/images/ajax_loader_small.gif", 
		"Resource=1", 
		"RecContentType=image/gif", 
		"Referer=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/styles.css", 
		"Snapshot=t36.inf", 
		LAST);

	web_add_auto_header("Accept-Language", 
		"en-GB,en;q=0.9");

	web_url("searchtermautocomplete", 
		"URL=https://demowebshop.tricentis.com/catalog/searchtermautocomplete?term=computing+and", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=https://demowebshop.tricentis.com/registerresult/1", 
		"Snapshot=t37.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("searchtermautocomplete_2", 
		"URL=https://demowebshop.tricentis.com/catalog/searchtermautocomplete?term=computing+and+inter", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=https://demowebshop.tricentis.com/registerresult/1", 
		"Snapshot=t38.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(8);

	web_url("searchtermautocomplete_3", 
		"URL=https://demowebshop.tricentis.com/catalog/searchtermautocomplete?term=computing+and+internet", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=https://demowebshop.tricentis.com/registerresult/1", 
		"Snapshot=t39.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("ui-bg_glass_75_dadada_1x400.png", 
		"URL=https://demowebshop.tricentis.com/Content/jquery-ui-themes/smoothness/images/ui-bg_glass_75_dadada_1x400.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/Content/jquery-ui-themes/smoothness/jquery-ui-1.10.3.custom.min.css", 
		"Snapshot=t40.inf", 
		LAST);

	web_url("search", 
		"URL=https://demowebshop.tricentis.com/search?q=computing+and+internet", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=https://demowebshop.tricentis.com/registerresult/1", 
		"Snapshot=t41.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("0000209_copy-of-computing-and-internet-ex_125.jpeg", 
		"URL=https://demowebshop.tricentis.com/content/images/thumbs/0000209_copy-of-computing-and-internet-ex_125.jpeg", 
		"Resource=1", 
		"RecContentType=image/jpeg", 
		"Referer=https://demowebshop.tricentis.com/search?q=computing+and+internet", 
		"Snapshot=t42.inf", 
		LAST);

	web_url("0000130_computing-and-internet_125.jpeg", 
		"URL=https://demowebshop.tricentis.com/content/images/thumbs/0000130_computing-and-internet_125.jpeg", 
		"Resource=1", 
		"RecContentType=image/jpeg", 
		"Referer=https://demowebshop.tricentis.com/search?q=computing+and+internet", 
		"Snapshot=t43.inf", 
		LAST);

	web_concurrent_end(NULL);

	lr_end_transaction("search",LR_AUTO);

	return 0;
}
