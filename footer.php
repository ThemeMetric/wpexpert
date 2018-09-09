<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Wpexpert
 */

?>
 <footer id="footer" class="section" role="contentinfo">
            <div>
                <div class="lower">
                    <div class="logo">
                       <div class="bot_footer1">                      
                       <?php if (get_theme_mod('footer_text')) : ?>                   
                       <p><?php echo get_theme_mod('footer_text');?></p>
                        <?php	else : ?>
                        <?php endif ;?>
                       </div>                  
                    </div>

                    <ul class="social">
                    <?php if (get_theme_mod('googleplus')) : ?>                   
                        <li><a href="<?php echo get_theme_mod('googleplus');?>" target="_blank" title="Follow us on Google+" rel="noopener noreferrer"><span class="screen-reader-text">Follow us on Google+</span> <span class="fa fa-google-plus"></span></a></li>
                        <?php	else : ?>
                        <?php endif ;?>

                        <?php if (get_theme_mod('facebook')) : ?>
                        <li><a href="<?php echo get_theme_mod('facebook');?>" target="_blank" rel="noopener noreferrer" title="Follow us on Facebook"><span class="screen-reader-text">Follow us on Facebook</span> <span class="fa fa-facebook"></span></a></li>
                        <?php	else : ?>
                        <?php endif ;?>

                        <?php if (get_theme_mod('twitter')) : ?>
                        <li><a href="<?php echo get_theme_mod('twitter');?>" target="_blank" rel="noopener noreferrer" title="Follow us on Twitter"><span class="screen-reader-text">Follow us on Twitter</span> <span class="fa fa-twitter"></span></a></li>
                        <?php	else : ?>
                        <?php endif ;?>
                        
                        <?php if (get_theme_mod('linkdin')) : ?>
                        <li><a href="<?php echo get_theme_mod('linkdin');?>" target="_blank" rel="noopener noreferrer" title="Follow us on LinkedIn"><span class="screen-reader-text">Follow us on LinkedIn</span> <span class="fa fa-linkedin"></span></a></li>
                        <?php	else : ?>
                        <?php endif ;?>
                    </ul>
                    
                     <?php if ( has_nav_menu( 'menu-footer' ) ) {
                        wp_nav_menu( array(
                                'menu'              => 'menu-footer',
                                'theme_location'    => 'menu-footer',                         
                                'menu_class'        => 'links',
                                
                            )
                        );
                    }
                    ?>

                </div>
            </div>
        </footer>
        </div>
    <div id="news-signup">
    <div class="wrapper">
      <div id="news-signup_close"></div>
      <div class="newsletter-content" id="phplistsubscriberesult">
          
        <h2>Social media, Hacks & Security news. Delivered weekly.</h2>

        <p>Join thousands of readers who get our content first.</p>

        <form class="signup-form" id="signup-form" action="#">
          <p>
            <input type="text" name="email" id="news_signup_email" value="" autofocus>
          </p>
          <p class="button">
            <input type="submit" value="Subscribe">
          </p>
        </form>
        <p class="footnote">Give it a try. It only takes a click to unsubscribe.</p>
      </div>
    </div>
  </div>
 
        <div id="rock-bottom"></div>
				
<?php wp_footer(); ?>
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5b6175cefcc30d4b"></script>
</body>
</html>
