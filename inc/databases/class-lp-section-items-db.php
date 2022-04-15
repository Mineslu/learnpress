<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Class LP_Section_Items_DB
 */

class LP_Section_Items_DB extends LP_Database {
	public static $_instance;

	public function __construct() {
		parent::__construct();
	}

	public static function getInstance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * Get section items
	 *
	 * @throws Exception
	 * @since 4.1.6
	 * @version 1.0.0
	 * @return array|null|int|string
	 */
	public function get_section_items( LP_Section_Items_Filter $filter, int &$total_rows = 0 ) {
		$default_fields = $this->get_cols_of_table( $this->tb_posts );
		$filter->fields = array_merge( $default_fields, $filter->fields );

		if ( empty( $filter->collection ) ) {
			$filter->collection = $this->tb_posts;
		}

		if ( empty( $filter->collection_alias ) ) {
			$filter->collection_alias = 'p';
		}

		$filter->join[] = "INNER JOIN {$this->tb_lp_section_items} AS si ON si.item_id = p.ID";

		// Section id
		if ( $filter->section_id ) {
			$filter->where[] = $this->wpdb->prepare( 'AND si.section_id = %d', $filter->section_id );
		}

		// Item ids
		if ( ! empty( $filter->term_ids ) ) {
			$item_ids_format = LP_Helper::db_format_array( $filter->term_ids, '%d' );
			$filter->where[] = $this->wpdb->prepare( 'AND si.item_id IN (' . $item_ids_format . ')', $filter->item_ids );
		}

		return $this->execute( $filter, $total_rows );
	}
}

LP_Section_DB::getInstance();

