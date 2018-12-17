<?php

/*
Template Name: Page Case Study

 */
get_header();
?>
  <section class="section white gutter case-study" style="background-image: url(<?php the_field('page_background');?>);">
		<div>
            <div class="text_main">
                    <div class="heading_main" style="padding-top:50px; margin-bottom:15px;color: <?php the_field('title_color');?>;
"><?php the_field('page_title');?></div>
                    <div class="heading_para" style="margin-bottom:20px;">
                    <?php the_field('page_description');?></div>
                </div>


		<?php
while (have_posts()):
    the_post();

    get_template_part('template-parts/content', 'page');

    // If comments are open or we have at least one comment, load up the comment template.
    if (comments_open() || get_comments_number()):
        comments_template();
    endif;

endwhile; // End of the loop.
?>
		</div>
	</section>
<script defer type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/845799241/?guid=ON&amp;script=0"/>
</div>
</noscript>


<script>
window.addEventListener('load', function () {
    jQuery('a[href*="services/case-study/"] ').click(function () {
        gtag('event', 'view-detal', {'event_category': 'click', 'event_label': jQuery(this).attr('href')})
    })
    jQuery('a[href*="https: //www.chromeinfotech.net/services/case-study"] ').click(function () {
        gtag('event', 'case study', {'event_category': 'submit', 'event_label': jQuery(this).attr('href')})
    })
})


</script>
<?php get_footer();
