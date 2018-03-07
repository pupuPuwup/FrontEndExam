import React from 'react';
import axios from 'axios';
import List from './List';
import './App.css';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			search: '',
			data: []
		}
	}
	getData = team => 
		axios.get(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=${team}`)
		.then(res => this.setState({data: res.data.player}))
		.catch(err => console.log(err))
	render = () =>
		<div id="app">
			<div className="form-group">
				<h1>{`Daftar Pemain ${this.state.search}`}</h1>
				<input className="form-control" type="text" ref="search"/>
				<button onClick={() => {
					this.setState({search: this.refs.search.value})
					this.getData(this.refs.search.value);
				}} className="btn btn-success">Lihat Daftar</button>
			</div>
			<div id="display">
				{this.state.data.map(x => <List key={x.idPlayer} {...x}/>)}
			</div>
		</div>
}