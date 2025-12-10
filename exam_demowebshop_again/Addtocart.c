Addtocart()
{

	lr_start_transaction("addtocart");

	web_add_header("Accept-Language", 
		"en-GB,en;q=0.9");

	lr_think_time(20);

	web_url("ajax_loader_large.gif", 
		"URL=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/images/ajax_loader_large.gif", 
		"Resource=1", 
		"RecContentType=image/gif", 
		"Referer=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/styles.css", 
		"Snapshot=t44.inf", 
		LAST);

	web_add_auto_header("Accept-Language", 
		"en-GB,en;q=0.9");

	web_custom_request("1", 
		"URL=https://demowebshop.tricentis.com/addproducttocart/catalog/13/1/1", 
		"Method=POST", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=https://demowebshop.tricentis.com/search?q=computing+and+internet", 
		"Snapshot=t45.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_concurrent_start(NULL);

	web_url("ico-close-notification-bar.png", 
		"URL=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/images/ico-close-notification-bar.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/styles.css", 
		"Snapshot=t46.inf", 
		LAST);

	web_url("0000130_computing-and-internet_47.jpeg", 
		"URL=https://demowebshop.tricentis.com/content/images/thumbs/0000130_computing-and-internet_47.jpeg", 
		"Resource=1", 
		"RecContentType=image/jpeg", 
		"Referer=https://demowebshop.tricentis.com/search?q=computing+and+internet", 
		"Snapshot=t47.inf", 
		LAST);

	web_concurrent_end(NULL);

	lr_end_transaction("addtocart",LR_AUTO);

	return 0;
}
