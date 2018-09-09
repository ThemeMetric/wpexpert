<?php
/**
 * Wpexpert Theme Customizer
 *
 * @package Wpexpert
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */




/* Sajjad */
if ( ! function_exists( 'profectis_customize_register' ) ) {

	function profectis_customize_register( $wp_customize ) {

			// Theme General settigs
			$wp_customize->add_section( 'general_option', array(
					'title'       => __( 'General Option', 'wpexpert' ),
					'description'       => __( 'Theme general option', 'wpexpert' ),
					'priority'    => 20,
			) );

			$wp_customize->add_setting('logo_option',array(

					'default' => '',
					'transport' => 'refresh',
			));

			$wp_customize->add_control(new WP_Customize_Image_Control($wp_customize,'logo_option',array(
					'label'      => __( 'Logo', 'wpexpert' ),
					'description'       => __( 'Upload your logo image', 'wpexpert' ),
					'section'    => 'general_option',
					'settings'   => 'logo_option',

			)));


			$wp_customize->add_setting('logo_option_admin',array(

					'default' => '',
					'transport' => 'refresh',
			));


			$wp_customize->add_control(new WP_Customize_Image_Control($wp_customize,'logo_option_admin',array(
					'label'      => __( 'Admin Logo', 'wpexpert' ),
					'description'       => __('Upload your Log in page logo image', 'wpexpert'),
					'section'    => 'general_option',
					'settings'   => 'logo_option_admin',
			)));

			// Footer option

		 $wp_customize->add_setting('footer_text',array(
				 'default' => '© 2017 Chromeinfotech | All Rights Reserved ISO27001:2005',
		 ));

		 $wp_customize->add_control(new WP_Customize_Control($wp_customize,'footer_text',array(
				 'label' => __('Footer Copy text','wpexpert'),
				 'description' => __( 'Footer Copy Right Test Here', 'wpexpert' ),
				 'section' => 'general_option',
				 'settings'   => 'footer_text',
				 'type' => 'text'
		 )));

	 /* ***************************
	 // Add Social Media Section //
	 *************************** */
			$wp_customize->add_section( 'social-media' , array(
					'title' => __( 'Social Media', 'add_setting' ),
					'priority' => 30,
					'description' => __( 'Socieal media profile link.', 'wpexpert' )
			) );
			// Add Twitter Setting
			$wp_customize->add_setting( 'twitter' , array( 'default' => 'https://twitter.com' ));
			$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'twitter', array(
					'label' => __( 'Twitter', 'wpexpert' ),
					'section' => 'social-media',
					'settings' => 'twitter',
					'type' => 'text'
			) ) );
			// Add FB Setting
			$wp_customize->add_setting( 'facebook' , array( 'default' => 'https://facebook.com' ));
			$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'facebook', array(
					'label' => __( 'Facebook', 'wpexpert' ),
					'section' => 'social-media',
					'settings' => 'facebook',
					'type' => 'text'
			) ) );

			// Add Google plus Setting
			$wp_customize->add_setting( 'googleplus' , array( 'default' => 'https://plus.google.com' ));
			$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'googleplus', array(
					'label' => __( 'Google Plus', 'wpexpert' ),
					'section' => 'social-media',
					'settings' => 'googleplus',
					'type' => 'text'
			) ) );
			// Add Linkdin Setting
			$wp_customize->add_setting( 'linkdin' , array( 'default' => 'https://www.linkedin.com' ));
			$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'linkdin', array(
					'label' => __( 'Linkdin', 'wpexpert' ),
					'section' => 'social-media',
					'settings' => 'linkdin',
					'type' => 'text'
			) ) );
			// Blog section
			$wp_customize->add_section( 'blog' , array(
				'title' => __( 'Blog', 'wpexpert' ),
				'priority' => 30,
				'description' => __( 'Blog page settings.', 'wpexpert' )
		) );

		$wp_customize->add_setting('blog_banner',array(
			'default' => '',
			'transport' => 'refresh',
	));

	$wp_customize->add_control(new WP_Customize_Image_Control($wp_customize,'blog_banner',array(
			'label' => __('Blog Banner','wpexpert'),
			'description' => __( 'Upload Blof page Banner', 'wpexpert' ),
			'section' => 'blog',
			'settings'   => 'blog_banner',
	)));

	$wp_customize->add_setting('blog_heading',array(
		'default' => 'The Being Apptentive Blog',
		'transport' => 'refresh',
));

$wp_customize->add_control(new WP_Customize_Control($wp_customize,'blog_heading',array(
	'label' => __('Blog Header','wpexpert'),
	'description' => __( 'Blog page Heading', 'wpexpert' ),
	'section' => 'blog',
	'settings'   => 'blog_heading',
	'type' => 'text'
)));

$wp_customize->add_setting('blog_des',array(
	'default' => 'Connecting and educating mobile enthusiasts from around the globe.',
	'transport' => 'refresh',
));

$wp_customize->add_control(new WP_Customize_Control($wp_customize,'blog_des',array(
'label' => __('Blog Header Description','wpexpert'),
'description' => __( 'Blog page Heading description', 'wpexpert' ),
'section' => 'blog',
'settings'   => 'blog_des',
'type' => 'text'
)));

// page headung

$wp_customize->add_section( 'page' , array(
	'title' => __( 'Page', 'wpexpert' ),
	'priority' => 30,
	'description' => __( 'Single page settings.', 'wpexpert' )
) );

$wp_customize->add_setting('page_banner',array(
'default' => '',
'transport' => 'refresh',
));

$wp_customize->add_control(new WP_Customize_Image_Control($wp_customize,'page_banner',array(
'label' => __('Single page Banner','wpexpert'),
'description' => __( 'Upload  page Banner', 'wpexpert' ),
'section' => 'page',
'settings'   => 'page_banner',
)));

$wp_customize->add_setting('page_heading',array(
'default' => 'The Being Apptentive page',
'transport' => 'refresh',
));

$wp_customize->add_control(new WP_Customize_Control($wp_customize,'page_heading',array(
'label' => __('Page Header','wpexpert'),
'description' => __( ' page Heading', 'wpexpert' ),
'section' => 'page',
'settings'   => 'page_heading',
'type' => 'text'
)));

$wp_customize->add_setting('page_des',array(
'default' => 'Connecting and educating mobile enthusiasts from around the globe.',
'transport' => 'refresh',
));

$wp_customize->add_control(new WP_Customize_Control($wp_customize,'page_des',array(
'label' => __('Page Header Description','wpexpert'),
'description' => __( 'Blog page Heading description', 'wpexpert' ),
'section' => 'page',
'settings'   => 'page_des',
'type' => 'text'
)));




	}
}
add_action( 'customize_register', 'profectis_customize_register' );


/* Sajjad */



/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function wpexpert_customize_preview_js() {
	wp_enqueue_script( 'wpexpert-customizer', get_template_directory_uri() . '/asset/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'wpexpert_customize_preview_js' );
