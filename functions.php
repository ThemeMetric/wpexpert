<?php
/**
 * Wpexpert functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Wpexpert
 */

if ( ! function_exists( 'wpexpert_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function wpexpert_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Wpexpert, use a find and replace
		 * to change 'wpexpert' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'wpexpert', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );
		add_image_size( 'post', 300, 300, true ); 
		add_image_size( 'post-sticky', 480, 300, true ); 

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary' => esc_html__( 'Primary', 'wpexpert' ),
			'menu-footer' => esc_html__( 'Footer Menu', 'wpexpert' ),
			'toggle-menu' => esc_html__( 'Toggle Menu', 'wpexpert' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'wpexpert_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'wpexpert_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function wpexpert_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'wpexpert_content_width', 640 );
}
add_action( 'after_setup_theme', 'wpexpert_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function wpexpert_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'wpexpert' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'wpexpert' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
}
add_action( 'widgets_init', 'wpexpert_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function wpexpert_scripts() {
	wp_enqueue_style( 'wpexpert-style', get_stylesheet_uri() );
	wp_enqueue_style( 'wpexpert-custom', get_theme_file_uri( '/asset/css/custom.css' ));


	wp_enqueue_script( 'wpexpert-scripts', get_theme_file_uri('/asset/js/scripts.js'), array('jquery'), '', true );
	wp_enqueue_script( 'wpexpert-custom', get_theme_file_uri('/asset/js/custom.js'), array('jquery'), '', true );
	wp_enqueue_script( 'wpexpert-tooltios', get_theme_file_uri('/asset/js/tooltip.js'), array('jquery'), '', true );

	wp_enqueue_script( 'wpexpert-navigation', get_template_directory_uri() . '/asset/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'wpexpert-skip-link-focus-fix', get_template_directory_uri() . '/asset/js/skip-link-focus-fix.js', array(), '20151217', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'wpexpert_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Load WooCommerce compatibility file.
 */
if ( class_exists( 'WooCommerce' ) ) {
	require get_template_directory() . '/inc/woocommerce.php';
}

function wpc_exclude_sticky_posts( $query ) {  
  
	if ( $query->is_home() && $query->is_main_query() )  
	//$query->set( 'ignore_sticky_posts', 1 );  
	$query->set( 'post__not_in', get_option( 'sticky_posts' ) );  
	}  
	add_action( 'pre_get_posts', 'wpc_exclude_sticky_posts' ); 
	
	/* coment validation */

 function comment_validation_init() {
    if(is_single() && comments_open() ) { ?>        
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>
    <script type="text/javascript">
    jQuery(document).ready(function($) {
    $('#commentform').validate({

    rules: {
      author: {
        required: true,
        minlength: 2
      },

      email: {
        required: true,
        email: true
      },

      comment: {
        required: true,
        minlength: 2
      }
    },

    messages: {
      author: "Please fill out this field",
      email: "Please enter a valid email address.",
      comment: "Please fill out this field"
    },

    errorElement: "div",
    errorPlacement: function(error, element) {
      element.after(error);
    }

    });
    });
    </script>
    <?php
    }
    }
    add_action('wp_footer', 'comment_validation_init');
