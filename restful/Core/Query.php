<?php

namespace Core;


//optional

class Query {

  public static function SELECT($columns, $table, $where = null, $order = null, $limit = null) {
    return '
    SELECT '.$columns.'
    FROM '.$table.'
    '.($where != null ? 'WHERE '.$where.'' : '').'
    '.($order != null ? 'ORDER BY '.$order.'' : '').'
    '.($limit != null ? 'LIMIT '.$limit.'' : '').'
    ';
  }

  public static function INSERT($table, $insertData) {

    $columns = '';
    $values = '';
    $i = 0;
    foreach ($insertData as $key => $value) {
      if ($i == count($insertData) - 1) {
        $columns .= $key;
        $values .= '\''.$value.'\'';
      } else {
        $columns .= $key.', ';
        $values .= '\''.$value.'\', ';
      }
      $i++;
    }

    return '
    INSERT INTO '.$table.' ('.$columns.')
    VALUES ('.$values.')
    ';
  }

}