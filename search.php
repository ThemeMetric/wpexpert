<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
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
<div class="sidebar-layout clearfix">
    <div class="content">
        <div>

 <?php
if ( have_posts() ) : ?>
<header class="page-header">
<h1 class="page-title"><?php printf( esc_html__( 'Search Results for: %s', 'wpexpert' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
</header><!-- .page-header -->

<?php
/* Start the Loop */
while ( have_posts() ) : the_post();

/**
 * Run the loop for the search to output the results.
 * If you want to overload this in a child theme then include a file
 * called content-search.php and that will be used instead.
 */
get_template_part( 'template-parts/content', 'search' );

endwhile;

else :
get_template_part( 'template-parts/content', 'none' );

endif; ?>
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
