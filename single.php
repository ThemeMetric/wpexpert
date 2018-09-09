<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Wpexpert
 */

get_header();
?>
<section class="section white gutter">
<div>
<div class="sidebar-layout clearfix">
<div class="content">
<div>
<?php
while ( have_posts() ) : the_post();

get_template_part( 'template-parts/content-single', get_post_format() );

if ( comments_open() || get_comments_number() ) :
comments_template();
endif;
endwhile; 
?>
</div>
</div>
<aside>
<?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside>
</div>
</div>
</section>
<?php get_footer();
