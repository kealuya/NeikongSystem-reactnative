package com.myapp;

import com.facebook.react.ReactActivity;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import co.eleken.react_native_touch_id_android.FingerprintPackage;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import cn.reactnative.modules.update.UpdatePackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.github.yamill.orientation.OrientationPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MyApp";
    }
}
