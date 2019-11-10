// @flow
import React, { Component } from 'react';
import FileManager from '../components/FileManager';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return <FileManager />;
  }
}
