import { Component, OnInit } from '@angular/core';
import { StyleManager } from '../services/style-manager.service';
import { DocsSiteTheme, ThemeStorage } from '../services/theme-storage.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.css']
})
export class ThemePickerComponent implements OnInit {
  currentTheme;

  themes = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      href: 'deeppurple-amber.css',
      isDark: false,
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      href: 'indigo-pink.css',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      href: 'pink-bluegrey.css',
      isDark: true,
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      href: 'purple-green.css',
      isDark: true,
    },
  ];

  constructor(public styleManager: StyleManager,
    private _themeStorage: ThemeStorage) {
      const currentTheme = this._themeStorage.getStoredTheme();
      if (currentTheme) {
        this.installTheme(currentTheme);
      }
     }

  ngOnInit() {
  }

  installTheme(theme: DocsSiteTheme) {
    this.currentTheme = this._getCurrentThemeFromHref(theme.href);

      console.log(theme);
   // if (theme.isDefault) {
    //  this.styleManager.removeStyle('theme');
    //} else {
      console.log('setting style');

      this.styleManager.setStyle('theme', `/assets/custom-themes/${theme.href}`);
   // }

    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }


  private _getCurrentThemeFromHref(href: string): DocsSiteTheme {
    return this.themes.find(theme => theme.href === href);
  }
}

