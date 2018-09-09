<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Wpexpert
 */

?>


<article id="post-<?php the_ID(); ?>" <?php post_class('summary-post'); ?>>

	<div class="entry-content clearfix">

<h1 class="heading"><?php the_title(); ?></h1>
		
<header class="clearfix">
      <div>
        <div class="author-photo">

<?php echo get_avatar( get_the_author_meta( 'ID' ), 96 ); ?>

							</div>
        <div class="deets">

         	<?php  wpexpert_posted_by();?>  	<?php the_date('F j, Y'); ?>	
          
          </div>
        <div class="social">
           <div>
           


                <!-- Go to www.addthis.com/dashboard to customize your tools -->
                Share: <div class="addthis_inline_share_toolbox"></div>
            
                
            

          </div>
      </div>
</header>

<?php the_content(); ?>



<footer>
<div class="categories">
Posted in: <?php $categories = get_the_category();
        if ( ! empty( $categories ) ) {
            echo '<a href="'.esc_url( get_category_link( $categories[0]->term_id ) ).'"><i class="fa fa-wpexplorer"></i> '.esc_html( $categories[0]->name ).'</a>';
        } ?>

</div>

<div class="author clearfix">
<div class="photo">
<?php echo get_avatar( get_the_author_meta( 'ID' ), 96 ); ?>	</div>
<div class="bio">
  <div>
    <h4>About <?php the_author() ; ?></h4>
    <div class="content">

    <?php the_author_meta( 'description' ); ?>


  </div>
<div class="author-social-links">
    <?php echo wpexp_get_user_social_links(); ?>
</div>
</div>
</div>
</div>

        </footer>

	</div>
	<!-- .entry-content -->
	<footer class="entry-footer">
	</footer>
	<!-- .entry-footer -->

</article>
