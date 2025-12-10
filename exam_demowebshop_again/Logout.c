Logout()
{

	lr_start_transaction("logout");

	web_add_header("Accept-Language", 
		"en-GB,en;q=0.9");

	lr_think_time(20);

	web_url("logout", 
		"URL=https://demowebshop.tricentis.com/logout", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=https://demowebshop.tricentis.com/search?q=computing+and+internet", 
		"Snapshot=t48.inf", 
		"Mode=HTTP", 
		LAST);

	lr_end_transaction("logout",LR_AUTO);

	return 0;
}
