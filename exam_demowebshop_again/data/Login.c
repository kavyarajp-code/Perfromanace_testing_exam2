Login()
{

	lr_start_transaction("login");

	web_add_auto_header("Accept-Language", 
		"en-GB,en;q=0.9");

	lr_think_time(14);

	web_url("login", 
		"URL=https://demowebshop.tricentis.com/login", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t49.inf", 
		"Mode=HTTP", 
		LAST);

	lr_end_transaction("login",LR_AUTO);

	web_submit_data("login_2", 
		"Action=https://demowebshop.tricentis.com/login", 
		"Method=POST", 
		"RecContentType=text/html", 
		"Referer=https://demowebshop.tricentis.com/login", 
		"Snapshot=t50.inf", 
		"Mode=HTTP", 
		"EncodeAtSign=YES", 
		ITEMDATA, 
		"Name=Email", "Value=kavyaaaaa@gmail.com", ENDITEM, 
		"Name=Password", "Value=kavyaraj", ENDITEM, 
		"Name=RememberMe", "Value=false", ENDITEM, 
		LAST);

	return 0;
}