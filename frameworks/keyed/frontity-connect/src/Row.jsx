import React, { Component } from 'react'
import connect from './connect'

function Row({ state, actions, row }) {

	const onDelete = () => {
		actions.delete(row)
	}

	const onClick = () => {
		actions.select(row)
	}

	const styleClass = row.selected ? 'danger' : ''

	return (
		<tr className={styleClass}>
			<td className="col-md-1">{row.id}</td>
			<td className="col-md-4">
				<a onClick={onClick}>{row.label}</a>
			</td>
			<td className="col-md-1"><a onClick={onDelete}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
			<td className="col-md-6"></td>
		</tr>
	)

}

export default connect(Row)
