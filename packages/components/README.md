# Grafana Components

- `NumberInput` allows to check and input numbers.
- `Collapse` allows to display collapsable elements.
- `Slider` allows to enter number values by slider and/or NumberInput.
- `Form` allows to render form controls from the declarative config generated by FormBuilder.
- `AutosizeCodeEditor` code editor with auto height resizing based on entered content.

### Hooks

- `useFormBuilder` allows to create declarative forms.
- `createUseDataHook` allows to create `useData` hook to get data through data source api.

### Utils

- `CodeParametersBuilder` allows to create parameters for custom code.

## Update Grafana Styles

1. Clone and build Grafana locally.
2. Create a folder `grafana-[version]` for the new version in `/.storybook/`.
3. Copy grafana files from `/public/fonts` to `/.storybook/grafana-[version]/public/fonts`.
4. Copy grafana files from `/public/img` to `/.storybook/grafana-[version]/public/img`. Only `icons`, `icons_dark_theme`, `icons_light_theme` and root files are necessary.
5. Copy and rename to `.scss` grafana files from `/public/build/grafana.light.[hash].css` to `/.storybook/grafana-[version]/grafana.light.scss`.
6. Copy and rename to `.scss` grafana files from `/public/build/grafana.dark.[hash].css` to `/.storybook/grafana-[version]/grafana.dark.scss`.
7. Update using folder from `grafana-[old-version]` to `grafana-[version]`.

## License

Apache License Version 2.0.
