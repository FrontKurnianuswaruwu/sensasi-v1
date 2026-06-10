<?php

namespace App\Helpers;

class TextHelper
{
    /**
     * Truncate HTML content while preserving basic formatting
     * @param string $html
     * @param int $limit
     * @param string $end
     * @return string
     */
    public static function truncateHtml($html, $limit = 150, $end = '...')
    {
        // Strip HTML tags
        $text = strip_tags($html);

        // Truncate if longer than limit
        if (strlen($text) > $limit) {
            $text = substr($text, 0, $limit) . $end;
        }

        return $text;
    }

    /**
     * Truncate plain text
     * @param string $text
     * @param int $limit
     * @param string $end
     * @return string
     */
    public static function truncateText($text, $limit = 150, $end = '...')
    {
        if (strlen($text) > $limit) {
            $text = substr($text, 0, $limit) . $end;
        }

        return $text;
    }

    /**
     * Get word count from HTML
     * @param string $html
     * @return int
     */
    public static function wordCount($html)
    {
        $text = strip_tags($html);
        return str_word_count($text);
    }
}
