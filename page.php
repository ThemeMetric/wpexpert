<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Wpexpert
 */

get_header();
?>
<?php if (get_theme_mod('page_banner')) : ?>
<section id="banner" class="section generic-banner" style="background-image: url(<?php echo get_theme_mod('page_banner');?>);">
<?php	else : ?>
<?php endif ;?>
<div>
<?php if (get_theme_mod('page_heading')) : ?>
        <h1 class="heading"><?php echo get_theme_mod('page_heading');?></h1>
        <?php	else : ?>
        <?php endif ;?>
        <?php if (get_theme_mod('page_des')) : ?>
        <p><?php echo get_theme_mod('page_des');?></p>
        <?php	else : ?>
        <?php endif ;?>
</div>
</section>
<section class="section white gutter">
		<div>
<?php
while ( have_posts() ) :
the_post();

get_template_part( 'template-parts/content', 'page' );

// If comments are open or we have at least one comment, load up the comment template.
if ( comments_open() || get_comments_number() ) :
comments_template();
endif;

endwhile; // End of the loop.
?>
		</div>
	</section>
<?php get_footer();
