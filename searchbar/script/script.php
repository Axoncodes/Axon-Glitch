<?php
  $search_name_arr = [];
  $search_link_arr = [];

  $wpb_all_query = new WP_Query(array('post_type'=>'page', 'post_status'=>'publish', 'posts_per_page'=>-1));
  if ( $wpb_all_query->have_posts() ) :
  while ( $wpb_all_query->have_posts() ) : $wpb_all_query->the_post();
  array_push($search_name_arr, get_the_title());
  array_push($search_link_arr, get_the_permalink());
  endwhile;
  wp_reset_postdata();
  else :
  endif;
  $wpb_all_query = new WP_Query(array('post_type'=>'post', 'post_status'=>'publish', 'posts_per_page'=>-1));
  if ( $wpb_all_query->have_posts() ) :
  while ( $wpb_all_query->have_posts() ) : $wpb_all_query->the_post();
  array_push($search_name_arr, get_the_title());
  array_push($search_link_arr, get_the_permalink());
  endwhile;
  wp_reset_postdata();
  else :
  endif;
  $results = new stdClass();
  $results->search_name_arr=$search_name_arr;
  $results->search_link_arr=$search_link_arr;
  return $results;

?>