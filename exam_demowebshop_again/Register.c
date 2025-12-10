Register()
{

	web_set_sockets_option("SSL_VERSION", "AUTO");

	web_add_auto_header("Accept-Language", 
		"en-GB,en;q=0.9");

	web_url("demowebshop.tricentis.com", 
		"URL=http://demowebshop.tricentis.com/", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=", 
		"Snapshot=t1.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("styles.css", 
		"URL=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/styles.css", 
		"Resource=1", 
		"RecContentType=text/css", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t2.inf", 
		LAST);

	web_url("responsive.css", 
		"URL=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/responsive.css", 
		"Resource=1", 
		"RecContentType=text/css", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t3.inf", 
		LAST);

	web_url("jquery-ui-1.10.3.custom.min.css", 
		"URL=https://demowebshop.tricentis.com/Content/jquery-ui-themes/smoothness/jquery-ui-1.10.3.custom.min.css", 
		"Resource=1", 
		"RecContentType=text/css", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t4.inf", 
		LAST);

	web_url("nivo-slider.css", 
		"URL=https://demowebshop.tricentis.com/Plugins/Widgets.NivoSlider/Content/nivoslider/nivo-slider.css", 
		"Resource=1", 
		"RecContentType=text/css", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t5.inf", 
		LAST);

	web_url("default.css", 
		"URL=https://demowebshop.tricentis.com/Plugins/Widgets.NivoSlider/Content/nivoslider/themes/default/default.css", 
		"Resource=1", 
		"RecContentType=text/css", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t6.inf", 
		LAST);

	web_url("jquery-1.10.2.min.js", 
		"URL=https://demowebshop.tricentis.com/Scripts/jquery-1.10.2.min.js", 
		"Resource=1", 
		"RecContentType=application/x-javascript", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t7.inf", 
		LAST);

	web_url("jquery.validate.min.js", 
		"URL=https://demowebshop.tricentis.com/Scripts/jquery.validate.min.js", 
		"Resource=1", 
		"RecContentType=application/x-javascript", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t8.inf", 
		LAST);

	web_url("jquery.validate.unobtrusive.min.js", 
		"URL=https://demowebshop.tricentis.com/Scripts/jquery.validate.unobtrusive.min.js", 
		"Resource=1", 
		"RecContentType=application/x-javascript", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t9.inf", 
		LAST);

	web_url("jquery-migrate-1.2.1.min.js", 
		"URL=https://demowebshop.tricentis.com/Scripts/jquery-migrate-1.2.1.min.js", 
		"Resource=1", 
		"RecContentType=application/x-javascript", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t10.inf", 
		LAST);

	web_url("jquery-ui-1.10.3.custom.min.js", 
		"URL=https://demowebshop.tricentis.com/Scripts/jquery-ui-1.10.3.custom.min.js", 
		"Resource=1", 
		"RecContentType=application/x-javascript", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t11.inf", 
		LAST);

	web_url("public.common.js", 
		"URL=https://demowebshop.tricentis.com/Scripts/public.common.js", 
		"Resource=1", 
		"RecContentType=application/x-javascript", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t12.inf", 
		LAST);

	web_url("jquery.nivo.slider.js", 
		"URL=https://demowebshop.tricentis.com/Plugins/Widgets.NivoSlider/Scripts/jquery.nivo.slider.js", 
		"Resource=1", 
		"RecContentType=application/x-javascript", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t13.inf", 
		LAST);

	web_url("public.ajaxcart.js", 
		"URL=https://demowebshop.tricentis.com/Scripts/public.ajaxcart.js", 
		"Resource=1", 
		"RecContentType=application/x-javascript", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t14.inf", 
		LAST);

	web_url("logo.png", 
		"URL=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/images/logo.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t15.inf", 
		LAST);

	web_url("0000215.png", 
		"URL=https://demowebshop.tricentis.com/content/images/thumbs/0000215.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t16.inf", 
		LAST);

	web_url("0000240.png", 
		"URL=https://demowebshop.tricentis.com/content/images/thumbs/0000240.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t17.inf", 
		LAST);

	web_url("0000015_25-virtual-gift-card_125.jpeg", 
		"URL=https://demowebshop.tricentis.com/content/images/thumbs/0000015_25-virtual-gift-card_125.jpeg", 
		"Resource=1", 
		"RecContentType=image/jpeg", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t18.inf", 
		LAST);

	web_url("0000224_141-inch-laptop_125.png", 
		"URL=https://demowebshop.tricentis.com/content/images/thumbs/0000224_141-inch-laptop_125.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t19.inf", 
		LAST);

	web_url("0000172_build-your-own-cheap-computer_125.jpeg", 
		"URL=https://demowebshop.tricentis.com/content/images/thumbs/0000172_build-your-own-cheap-computer_125.jpeg", 
		"Resource=1", 
		"RecContentType=image/jpeg", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t21.inf", 
		LAST);

	web_url("0000201_build-your-own-expensive-computer_125.jpeg", 
		"URL=https://demowebshop.tricentis.com/content/images/thumbs/0000201_build-your-own-expensive-computer_125.jpeg", 
		"Resource=1", 
		"RecContentType=image/jpeg", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t27.inf", 
		LAST);

	web_url("0000031_build-your-own-computer_125.jpeg", 
		"URL=https://demowebshop.tricentis.com/content/images/thumbs/0000031_build-your-own-computer_125.jpeg", 
		"Resource=1", 
		"RecContentType=image/jpeg", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t28.inf", 
		LAST);

	web_url("0000204_simple-computer_125.jpeg", 
		"URL=https://demowebshop.tricentis.com/content/images/thumbs/0000204_simple-computer_125.jpeg", 
		"Resource=1", 
		"RecContentType=image/jpeg", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t29.inf", 
		LAST);

	web_url("favicon.ico", 
		"URL=https://demowebshop.tricentis.com/favicon.ico", 
		"Resource=1", 
		"RecContentType=image/x-icon", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t30.inf", 
		LAST);

	web_concurrent_end(NULL);

	web_url("top-menu-divider.png", 
		"URL=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/images/top-menu-divider.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/styles.css", 
		"Snapshot=t20.inf", 
		LAST);

	web_concurrent_start(NULL);

	web_url("star-x-active.png", 
		"URL=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/images/star-x-active.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/styles.css", 
		"Snapshot=t22.inf", 
		LAST);

	web_url("loading.gif", 
		"URL=https://demowebshop.tricentis.com/Plugins/Widgets.NivoSlider/Content/nivoslider/themes/default/loading.gif", 
		"Resource=1", 
		"RecContentType=image/gif", 
		"Referer=https://demowebshop.tricentis.com/Plugins/Widgets.NivoSlider/Content/nivoslider/themes/default/default.css", 
		"Snapshot=t23.inf", 
		LAST);

	web_url("bullet-right.gif", 
		"URL=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/images/bullet-right.gif", 
		"Resource=1", 
		"RecContentType=image/gif", 
		"Referer=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/styles.css", 
		"Snapshot=t24.inf", 
		LAST);

	web_url("star-x-inactive.png", 
		"URL=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/images/star-x-inactive.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/styles.css", 
		"Snapshot=t25.inf", 
		LAST);

	web_url("ui-bg_flat_75_ffffff_40x100.png", 
		"URL=https://demowebshop.tricentis.com/Content/jquery-ui-themes/smoothness/images/ui-bg_flat_75_ffffff_40x100.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/Content/jquery-ui-themes/smoothness/jquery-ui-1.10.3.custom.min.css", 
		"Snapshot=t26.inf", 
		LAST);

	web_concurrent_end(NULL);

	web_concurrent_start(NULL);

	web_url("arrows.png", 
		"URL=https://demowebshop.tricentis.com/Plugins/Widgets.NivoSlider/Content/nivoslider/themes/default/arrows.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/Plugins/Widgets.NivoSlider/Content/nivoslider/themes/default/default.css", 
		"Snapshot=t31.inf", 
		LAST);

	web_url("bullets.png", 
		"URL=https://demowebshop.tricentis.com/Plugins/Widgets.NivoSlider/Content/nivoslider/themes/default/bullets.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/Plugins/Widgets.NivoSlider/Content/nivoslider/themes/default/default.css", 
		"Snapshot=t32.inf", 
		LAST);

	web_concurrent_end(NULL);

	lr_think_time(11);

	lr_start_transaction("register");

	web_url("Register", 
		"URL=https://demowebshop.tricentis.com/register", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=https://demowebshop.tricentis.com/", 
		"Snapshot=t33.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("top-menu-triangle.png", 
		"URL=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/images/top-menu-triangle.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=https://demowebshop.tricentis.com/Themes/DefaultClean/Content/styles.css", 
		"Snapshot=t34.inf", 
		LAST);

	web_submit_data("register", 
		"Action=https://demowebshop.tricentis.com/register", 
		"Method=POST", 
		"RecContentType=text/html", 
		"Referer=https://demowebshop.tricentis.com/register", 
		"Snapshot=t35.inf", 
		"Mode=HTTP", 
		"EncodeAtSign=YES", 
		ITEMDATA, 
		"Name=__RequestVerificationToken", "Value=2Fa8aCDdrxRvXUsOZ6NOpyT8PX5pRRPHZ_oKuwtnSCnX1VCUIS_Tedf3rjYmCJXvVBdirKWRdyWlb1OyS0vvvz-p7eQGEC_OwJ3JYrlN_xc1", ENDITEM, 
		"Name=Gender", "Value=F", ENDITEM, 
		"Name=FirstName", "Value=kavya", ENDITEM, 
		"Name=LastName", "Value=raj", ENDITEM, 
		"Name=Email", "Value=kavyaaaaa@gmail.com", ENDITEM, 
		"Name=Password", "Value=kavyaraj", ENDITEM, 
		"Name=ConfirmPassword", "Value=kavyaraj", ENDITEM, 
		"Name=register-button", "Value=Register", ENDITEM, 
		LAST);

	lr_end_transaction("register",LR_AUTO);

	return 0;
}
