<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Wpexpert
 */

get_header();
?>
 <?php if (get_theme_mod('blog_banner')) : ?>
<section id="banner" class="section generic-banner" style="background-image: url(<?php echo get_theme_mod('blog_banner');?>);">
<?php	else : ?>
<?php endif ;?>

<div>
<?php if (get_theme_mod('blog_heading')) : ?>
        <h1 class="heading"><?php echo get_theme_mod('blog_heading');?></h1>
        <?php	else : ?>
        <?php endif ;?>
        <?php if (get_theme_mod('blog_des')) : ?>
        <p><?php echo get_theme_mod('blog_des');?></p>
        <?php	else : ?>
        <?php endif ;?>
</div>
</section>


<section class="section white gutter">
    <div>

<?php 
/* Get all sticky posts */
$sticky = get_option( 'sticky_posts' );
 
/* Sort the stickies with the newest ones at the top */
rsort( $sticky );
 
/* Get the 5 newest stickies (change 5 for a different number) */
$sticky = array_slice( $sticky, 0, 1 );
 
/* Query sticky posts */
$the_query = new WP_Query( array( 'post__in' => $sticky, 'ignore_sticky_posts' => 1 ) );
// The Loop
if ( $the_query->have_posts() ) {
    
    while ( $the_query->have_posts() ) {
        $the_query->the_post();
     get_template_part( 'template-parts/content-sticky', get_post_format() );
   
    }
    
} else {
    // no posts found
}
/* Restore original Post Data */
wp_reset_postdata();
 

?>

<div class="sidebar-layout clearfix">
    <div class="content">
        <div>

<?php


while ( have_posts() ) : the_post();
/*
 * Include the Post-Format-specific template for the content.
 * If you want to override this in a child theme, then include a file
 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
 */
get_template_part( 'template-parts/content', get_post_format() );

endwhile;	

?>


<nav class="navigation pagination" role="navigation">
    <h2 class="screen-reader-text">Posts navigation</h2>
<?php the_posts_pagination(array(
'next_text' => '<span aria-hidden="true">Next Page</span>',
'prev_text' => '<span aria-hidden="true">  Prev Page </span>',
'screen_reader_text' => ' ',

)); ?>
        
                </nav>
            </div>
        </div>
        <aside>
        <?php dynamic_sidebar( 'sidebar-1' ); ?>
        </aside>
        </div>

    </div>
</section>

<?php get_footer();
