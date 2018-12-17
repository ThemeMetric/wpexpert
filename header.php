<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Wpexpert
 */

?>
<!doctype html>
<html <?php language_attributes();?>>
<head>
	<meta charset="<?php bloginfo('charset');?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">


	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel='stylesheet' id='google-fonts-css' href='//fonts.googleapis.com/css?family=Lato%3A300%2C400%2C700%2C900%2C300italic%2C400italic%2C700italic%2C900italic%7CRaleway%3A300%2C300i%2C400%2C700&#038;ver=4.9.7' type='text/css' media='all' />

	<?php wp_head();?>

</head>

<body <?php body_class();?>>
    <div id="page">
        <header id="header" class="section" role="banner">
            <div>
                <div class="logo">
                <?php $logo = get_theme_mod('logo_option');?>
                    <?php if ($logo) {?>
                    <a href="https://www.chromeinfotech.net"><img src="<?php echo $logo; ?>" alt="<?php bloginfo('name');?>" width="230" height="40" data-fallback="<?php echo $logo; ?>" /></a>
                    <?php } else {?>
                        <h1 class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name');?></a></h1>
                        <h2 class="site-description"><?php bloginfo('description');?></h2>
                    <?php }?>


                </div>
                <nav role="navigation">
                <?php wp_nav_menu(array(
    'menu' => 'primary',
    'theme_location' => 'primary',
    'menu_class' => 'primary',
    'menu_id' => 'primary-nav',
    'container' => '',
)
);
?>
                </nav>


<div id="myNav" class="overlay"> <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <div class="overlay-content">



                <?php wp_nav_menu(array(
    'menu' => 'toggle-menu',
    'theme_location' => 'toggle-menu',
    'menu_class' => '',
    'menu_id' => '',
    'container' => '',
)
);
?>

    </div>
</div>
<span style="font-size:30px;cursor:pointer" onclick="openNav()">
    <div class="hamburger pull-right">
        <div class="top-bun"></div>
        <div class="meat"></div>
        <div class="bottom-bun"></div>
    </div>
</span>
            </div>
        </header>
