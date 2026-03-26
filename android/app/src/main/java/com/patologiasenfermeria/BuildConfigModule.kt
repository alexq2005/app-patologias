package com.patologiasenfermeria

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class BuildConfigModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "BuildConfigModule"

    override fun getConstants(): Map<String, Any> = mapOf(
        "IS_FREE" to BuildConfig.IS_FREE,
        "VERSION_NAME" to BuildConfig.VERSION_NAME,
        "FLAVOR" to BuildConfig.FLAVOR,
    )
}
