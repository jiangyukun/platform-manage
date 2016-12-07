/**
 * Created by jiangyukun on 2016/11/27.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import Select1 from '../../Select1'

class SubOptions extends Component {
    constructor(props, context) {
        super(props, context)
        this.selectOption = this.selectOption.bind(this)
        this.state = {active: false}
        context.addSubItem(this)
    }

    selectOption(option) {
        let {text, value} = option
        this.context.selectSubItem(`，${this.props.title}：` + text, value, text)
    }

    onChange(typeItem) {
        if (typeItem.value) {
            this.setState({active: true})
        } else {
            this.setState({active: false})
        }
        this._select1.reset()
    }

    reset() {
        this.setState({active: false})
        this._select1.reset()
    }

    render() {
        return (
            <div className={classnames('custom-item-wrap', {'hidden': !this.state.active})}>
                {this.props.title}：
                <span style={{width: '150px', display: 'inline-block'}}>
                    <Select1 ref={c => this._select1 = c} selectItems={this.props.options || []} onSelect={this.selectOption}/>
                </span>
            </div>
        )
    }
}

SubOptions.propTypes = {
    title: PropTypes.string,
    options: PropTypes.array
}

SubOptions.contextTypes = {
    selectSubItem: PropTypes.func,
    addSubItem: PropTypes.func
}

export default SubOptions
