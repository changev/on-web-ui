'use strict';

/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import mixin from 'react-mixin';
import DialogHelpers from 'common-web-ui/mixins/DialogHelpers';
import FormatHelpers from 'common-web-ui/mixins/FormatHelpers';
import RouteHelpers from 'common-web-ui/mixins/RouteHelpers';
import GridHelpers from 'common-web-ui/mixins/GridHelpers';
/* eslint-enable no-unused-vars */

import {
    IconButton,
    RaisedButton
  } from 'material-ui';

import TemplateStore from '../stores/TemplateStore';
let templates = new TemplateStore();

@mixin.decorate(DialogHelpers)
@mixin.decorate(FormatHelpers)
@mixin.decorate(RouteHelpers)
@mixin.decorate(GridHelpers)
export default class TemplatesGrid extends Component {

  state = {templates: null};

  componentDidMount() {
    this.unwatchTemplates = templates.watchAll('templates', this);
    this.listTemplates();
  }

  componentWillUnmount() { this.unwatchTemplates(); }

  render() {
    return (
      <div className="TemplatesGrid">
        {this.renderGridToolbar({
          label: <a href="#/templates">Templates</a>,
          count: this.state.templates && this.state.templates.length || 0,
          createButton:
            <RaisedButton label="Create Template" primary={true} onClick={this.createTemplate.bind(this)} />
        })}
        <div className="clearfix"></div>
        {
          this.renderGrid({
            results: this.state.templates,
            resultsPerPage: 10
          }, template => (
            {
              ID: <a href={this.routePath('templates', template.id)}>{this.shortId(template.id)}</a>,
              Name: template.name,
              Created: this.fromNow(template.createdAt),
              Updated: this.fromNow(template.updatedAt),
              Actions: [
                <IconButton iconClassName="fa fa-edit"
                            tooltip="Edit Template"
                            touch={true}
                            onClick={this.editTemplate.bind(this, template.id)} />,
                <IconButton iconClassName="fa fa-remove"
                            tooltip="Remove Template"
                            touch={true}
                            onClick={this.deleteTemplate.bind(this, template.id)} />
              ]
            }
          ), 'No templates.')
        }
      </div>
    );
  }

  listTemplates() { templates.list(); }

  editTemplate(id) { this.routeTo('templates', id); }

  createTemplate() { this.routeTo('templates', 'new'); }

  deleteTemplate(id) {
    this.confirmDialog('Are you sure want to delete: ' + id,
      (confirmed) => confirmed && templates.destroy(id));
  }

}