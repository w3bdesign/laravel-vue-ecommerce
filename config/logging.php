<?php

use Monolog\Handler\NullHandler;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\SyslogUdpHandler;

return array(

    /*
    |--------------------------------------------------------------------------
    | Default Log Channel
    |--------------------------------------------------------------------------
    |
    | This option defines the default log channel that gets used when writing
    | messages to the logs. The name specified in this option should match
    | one of the channels defined in the "channels" configuration array.
    |
    */

    'default'  => env('LOG_CHANNEL', 'stack'),

    /*
    |--------------------------------------------------------------------------
    | Log Channels
    |--------------------------------------------------------------------------
    |
    | Here you may configure the log channels for your application. Out of
    | the box, Laravel uses the Monolog PHP logging library. This gives
    | you a variety of powerful log handlers / formatters to utilize.
    |
    | Available Drivers: "single", "daily", "slack", "syslog",
    |                    "errorlog", "monolog",
    |                    "custom", "stack"
    |
    */

    'channels' => array(
        'stack'      => array(
            'driver'            => 'stack',
            'channels'          => array( 'single' ),
            'ignore_exceptions' => false,
        ),

        'single'     => array(
            'driver' => 'errorlog',
            'path'   => storage_path('logs/laravel.log'),
            'level'  => env('LOG_LEVEL', 'debug'),
        ),

        'daily'      => array(
            'driver' => 'errorlog',
            'path'   => storage_path('logs/laravel.log'),
            'level'  => env('LOG_LEVEL', 'debug'),
            'days'   => 14,
        ),

        'slack'      => array(
            'driver'   => 'errorlog',
            'url'      => env('LOG_SLACK_WEBHOOK_URL'),
            'username' => 'Laravel Log',
            'emoji'    => ':boom:',
            'level'    => env('LOG_LEVEL', 'critical'),
        ),

        'papertrail' => array(
            'driver'       => 'errorlog',
            'level'        => env('LOG_LEVEL', 'debug'),
            'handler'      => SyslogUdpHandler::class,
            'handler_with' => array(
                'host' => env('PAPERTRAIL_URL'),
                'port' => env('PAPERTRAIL_PORT'),
            ),
        ),

        'stderr'     => array(
            'driver'    => 'errorlog',
            'handler'   => StreamHandler::class,
            'formatter' => env('LOG_STDERR_FORMATTER'),
            'with'      => array(
                'stream' => 'php://stderr',
            ),
        ),

        'syslog'     => array(
            'driver' => 'errorlog',
            'level'  => env('LOG_LEVEL', 'debug'),
        ),

        'errorlog'   => array(
            'driver' => 'errorlog',
            'level'  => env('LOG_LEVEL', 'debug'),
        ),

        'null'       => array(
            'driver'  => 'errorlog',
            'handler' => NullHandler::class,
        ),

        'emergency'  => array(
            'path' => storage_path('logs/laravel.log'),
        ),
    ),

);
