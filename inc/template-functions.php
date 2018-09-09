<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Wpexpert
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function wpexpert_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'wpexpert_body_classes' );



/* Sajjad */
function cc_mime_types($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
 }
 add_filter('upload_mimes', 'cc_mime_types');
 
 /* coment place holder */

 function my_update_comment_fields( $fields ) {

	$commenter = wp_get_current_commenter();
	$req       = get_option( 'require_name_email' );
	$label     = $req ? '*' : ' ' . __( '(optional)', 'wpexpert' );
	$aria_req  = $req ? "aria-required='true'" : '';

	$fields['author'] =
		'<p class="comment-form-author">
		
			<input id="author" name="author" type="text" placeholder="' . esc_attr__( "Name", "wpexpert" ) . '" value="' . esc_attr( $commenter['comment_author'] ) .
		'" size="30" ' . $aria_req . ' required/>
		</p>';

	$fields['email'] =
		'<p class="comment-form-email">
		
			<input id="email" name="email" type="email" placeholder="' . esc_attr__( "Email", "wpexpert" ) . '" value="' . esc_attr( $commenter['comment_author_email'] ) .
		'" size="30" ' . $aria_req . ' required/>
		</p>';

	$fields['url'] =
		'<p class="comment-form-url">
		
			<input id="url" name="url" type="url"  placeholder="' . esc_attr__( "http://google.com", "wpexpert" ) . '" value="' . esc_attr( $commenter['comment_author_url'] ) .
		'" size="30" />
			</p>';

	return $fields;
}
add_filter( 'comment_form_default_fields', 'my_update_comment_fields' );


function my_update_comment_field( $comment_field ) {

  $comment_field =
    '<p class="comment-form-comment">
            
            <textarea  id="comment" name="comment" placeholder="' . esc_attr__( "Write comment", "wpexpert" ) . '" cols="45" rows="8" aria-required="true" required></textarea>
        </p>';

  return $comment_field;
}
add_filter( 'comment_form_field_comment', 'my_update_comment_field' );

/* contact form thank you page */
add_action( 'wp_footer', 'redirect_cf7' );
 
function redirect_cf7() {
?>
<script type="text/javascript">
document.addEventListener( 'wpcf7mailsent', function( event ) {
   if ( '335' == event.detail.contactFormId ) { // Sends sumissions on form 947 to the first thank you page
    location = 'https://www.howtocreateanapp.co/thank-you.html';
    } else if ( '152' == event.detail.contactFormId ) { // Sends submissions on form 1070 to the second thank you page
        location = 'https://www.howtocreateanapp.co/thank-you.html';
    } else { // Sends submissions on all unaccounted for forms to the third thank you page
        location = 'https://www.howtocreateanapp.co/thank-you.html';
    }
}, false );
</script>
<?php
}

/* off pingback */
	
function no_self_ping( &$links ) {
    $home = get_option( 'home' );
    foreach ( $links as $l => $link )
        if ( 0 === strpos( $link, $home ) )
            unset($links[$l]);
}
 
add_action( 'pre_ping', 'no_self_ping' );


// Replace WordPress login logo with your own
add_action('login_head', 'profectis_custom_login_logo');
function profectis_custom_login_logo() {
    echo '<style>
    h1 a { background-image:url("'.get_theme_mod('logo_option_admin').'") !important;  margin-bottom: 0 !important; padding-bottom: 0 !important; -webkit-background-size: 125px!important;background-size: 220px!important;background-position: center center!important; height: 125px!important;font-size: 35px!important;width: 225px!important; }
    .login form { margin-top: 2px !important; background:#fff!important;}
    h1{
    background:#fff!important;
    }
   body.login {
   background-color: #000000;
 }
</style>';
}



/*-----------------------------------------------------------*/
    /*   Add User Social Links
    /*-----------------------------------------------------------*/
    function wpexp_add_user_social_links( $user_contact ) {

			/* Add user contact methods */
			$user_contact['twitter']   = __('Twitter Link', 'textdomain');
			$user_contact['facebook']  = __('Facebook Link', 'textdomain');
			$user_contact['linkedin']  = __('LinkedIn Link', 'textdomain');
			$user_contact['github']    = __('Github Link', 'textdomain');
			$user_contact['instagram'] = __('Instagram Link', 'textdomain');
			$user_contact['dribbble']  = __('Dribbble Link', 'textdomain');
			$user_contact['behance']   = __('Behance Link', 'textdomain');
			$user_contact['skype']     = __('Skype Link', 'textdomain');
			$user_contact['portfolio']     = __('Portfolio Link', 'textdomain');
	
			return $user_contact;
	}
	add_filter('user_contactmethods', 'wpexp_add_user_social_links');
	
	function wpexp_get_user_social_links() {
			$return  = '<ul class="social">';
			if(!empty(get_the_author_meta('twitter'))) {
					$return .= '<li><a href="'.get_the_author_meta('twitter').'" title="Twitter" target="_blank" id="twitter"><span class="fa fa-twitter"></span></a></li>';
			}
			if(!empty(get_the_author_meta('facebook'))) {
					$return .= '<li><a href="'.get_the_author_meta('facebook').'" title="Facebook" target="_blank" id="facebook"><span class="fa fa-facebook"></span></a></li>';
			}
			if(!empty(get_the_author_meta('linkedin'))) {
					$return .= '<li><a href="'.get_the_author_meta('linkedin').'" title="LinkedIn" target="_blank" id="linkedin"><span class="fa fa-linkedin"></span></a></li>';
			}
			if(!empty(get_the_author_meta('github'))) {
					$return .= '<li><a href="'.get_the_author_meta('github').'" title="Github" target="_blank" id="github"><span class="fa fa-github"></span></a></li>';
			}
			if(!empty(get_the_author_meta('instagram'))) {
					$return .= '<li><a href="'.get_the_author_meta('instagram').'" title="Instagram" target="_blank" id="instagram"><span class="fa fa-instagram"></span></a></li>';
			}
			if(!empty(get_the_author_meta('dribbble'))) {
					$return .= '<li><a href="'.get_the_author_meta('dribbble').'" title="Dribbble" target="_blank" id="dribbble"><span class="fa fa-dribbble"></span></a></li>';
			}
			if(!empty(get_the_author_meta('behance'))) {
					$return .= '<li><a href="'.get_the_author_meta('behance').'" title="Behance" target="_blank" id="behance"><span class="fa fa-behance"></span></a></li>';
			}
			if(!empty(get_the_author_meta('skype'))) {
					$return .= '<li><a href="'.get_the_author_meta('skype').'" title="Skype" target="_blank" id="skype"><span class="fa fa-skype"></span></a></li>';
			}
			if(!empty(get_the_author_meta('portfolio'))) {
				$return .= '<li><a href="'.get_the_author_meta('portfolio').'" title="Portfolio link" target="_blank" id="portfolio"><span class="fa fa-home"></span></a></li>';
		}
			$return .= '</ul>';
	
			return $return;
	}