package com.myapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import com.theweflex.react.WeChatPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import cn.reactnative.modules.update.UpdatePackage;
import cn.reactnative.modules.update.UpdateContext;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.github.ajalt.reprint.core.Reprint;
import co.eleken.react_native_touch_id_android.FingerprintPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSBundleFile() {
        return UpdateContext.getBundleUrl(MainApplication.this);
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new OrientationPackage(),
          new ImagePickerPackage(),
          new PickerPackage(),
          new UpdatePackage(),
          new BackgroundTimerPackage(),
          new BackgroundTaskPackage(),
          new FingerprintPackage(),
          new MPAndroidChartPackage(),
          new WeChatPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    BackgroundTaskPackage.useContext(this);
    Reprint.initialize(this);
  }
}
