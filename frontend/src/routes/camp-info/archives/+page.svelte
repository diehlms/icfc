<!-- import React, { useEffect, useState } from 'react';
import { Tab, Divider, Grid, Button, Icon } from 'semantic-ui-react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Header from '../shared/PageTitle';
import DocumentUpload from '../shared/DocumentUpload';
import axiosClient from '../../services/axios';

import styled from 'styled-components';

const RailsLink = styled.a`
`;

export default function Index(props) {
    const [backBayBilges, setBackBayBilges] = useState([]);
    const [dailyBilges, setDailyBilges] = useState([]);

    const deleteDoc = (e, formId) => {
        e.preventDefault();
        axiosClient.delete(`documents/destroy/${formId}`)
        .then(res => {
        })
        .catch(err => {
            setError(err.response.data.errors);
        });
    }

    const panes = [
        {
            menuItem: 'Back Bay Bilges (1993-2013)',
            render: () => 
                <Tab.Pane>
                    <ListGroup>
                        {
                            !!backBayBilges && backBayBilges.length > 0 ? (
                                <React.Fragment>
                                    {
                                        backBayBilges.map((backBayBilge, i) => (
                                            <ListGroupItem
                                                key={i}
                                            >
                                                <RailsLink 
                                                    href={backBayBilge.document.url} 
                                                    target="_blank">
                                                        {backBayBilge.document_title}
                                                </RailsLink>
                                                {
                                                    props.isAdmin ? (
                                                        <Button onClick={e => deleteDoc(e, backBayBilge.id)} size='mini' circular color='red' floated='right' icon>
                                                            <Icon name='trash' />
                                                        </Button>
                                                    ) : (
                                                        <React.Fragment />
                                                    )
                                                }
                                            </ListGroupItem>
                                        ))
                                    }
                                </React.Fragment>
                            ) : (
                                <React.Fragment />
                            )
                        }
                    </ListGroup>
                </Tab.Pane>,
        },
        { 
            menuItem: 'Daily Bilges (2001 - 2021)', 
            render: () => 
            <Tab.Pane>
                <ListGroup>
                    {
                            !!dailyBilges && dailyBilges.length > 0 ? (
                                <React.Fragment>
                                    {
                                        dailyBilges.map((dailyBilge, i) => (
                                            <ListGroupItem
                                                key={i}
                                            >
                                                <RailsLink 
                                                    href={dailyBilge.document.url} 
                                                    target="_blank">
                                                        {dailyBilge.document_title}
                                                </RailsLink>
                                                {
                                                    props.isAdmin ? (
                                                        <Button onClick={e => deleteDoc(e, dailyBilge.id)} size='mini' circular color='red' floated='right' icon>
                                                            <Icon name='trash' />
                                                        </Button>
                                                    ) : (
                                                        <React.Fragment />
                                                    )
                                                }
                                            </ListGroupItem>
                                        ))
                                    }
                                </React.Fragment>
                            ) : (
                                <React.Fragment />
                            )
                        }
                </ListGroup>
            </Tab.Pane> 
        },
    ]

    useEffect(() => {
        ['backBayBilges', 'dailyBilges'].forEach(archive => {
            axiosClient.get(`documents/index/${archive}`)
            .then(res => {
                archive === 'backBayBilges' ? 
                    setBackBayBilges(res.data) :
                    setDailyBilges(res.data);
            })
            .catch(err => {
                setError(err)
            });
        })
    }, []);

    return (
        <div className="reactPageAppContainer">
            <Header 
                size="h1"
                text="Archives"
            />
            {
                props.isAdmin ? (
                    <React.Fragment>
                        <Grid columns={2}>
                            <Grid.Column>
                                <DocumentUpload 
                                    folderName='backBayBilges'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <DocumentUpload 
                                    folderName='dailyBilges'
                                />
                            </Grid.Column>
                        </Grid>
                        <Divider />
                    </React.Fragment>
                ) : (
                    <React.Fragment />
                )
            }
            <Tab panes={panes}></Tab>
        </div>
    )
} -->

<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/display/Header.svelte';
	// import DocumentUpload from '../shared/DocumentUpload.svelte';

	let backBayBilges = [];
	let dailyBilges = [];
	let isAdmin = false; // Hardcoded value, replace with actual logic

	function deleteDoc(e, formId) {
		e.preventDefault();
		// Simulate API call for deleting a document
		console.log(`Document with id ${formId} deleted`);
	}

	onMount(() => {
		// Simulate fetching archives data from an API
		backBayBilges = [
			{ id: 1, document: { url: '#', document_title: 'Back Bay Document 1' } },
			{ id: 2, document: { url: '#', document_title: 'Back Bay Document 2' } }
		];

		dailyBilges = [
			{ id: 1, document: { url: '#', document_title: 'Daily Document 1' } },
			{ id: 2, document: { url: '#', document_title: 'Daily Document 2' } }
		];
	});
</script>

<div class="reactPageAppContainer">
	<Header size="h1" text="Archives" />

	{#if isAdmin}
		<div class="grid grid-cols-2 gap-4">
			<!-- <DocumentUpload folderName="backBayBilges" />
      <DocumentUpload folderName="dailyBilges" /> -->
		</div>
		<hr class="my-4" />
	{/if}

	<div class="tabs">
		<div class="tab">
			<h3>Back Bay Bilges (1993-2013)</h3>
			<ul class="list-group">
				{#if backBayBilges.length > 0}
					{#each backBayBilges as backBayBilge (backBayBilge.id)}
						<li class="list-group-item">
							<a href={backBayBilge.document.url} target="_blank">
								{backBayBilge.document.document_title}
							</a>
							{#if isAdmin}
								<button
									class="btn btn-red btn-sm float-right"
									on:click={(e) => deleteDoc(e, backBayBilge.id)}
								>
									🗑️
								</button>
							{/if}
						</li>
					{/each}
				{/if}
			</ul>
		</div>

		<div class="tab">
			<h3>Daily Bilges (2001 - 2021)</h3>
			<ul class="list-group">
				{#if dailyBilges.length > 0}
					{#each dailyBilges as dailyBilge (dailyBilge.id)}
						<li class="list-group-item">
							<a href={dailyBilge.document.url} target="_blank">
								{dailyBilge.document.document_title}
							</a>
							{#if isAdmin}
								<button
									class="btn btn-red btn-sm float-right"
									on:click={(e) => deleteDoc(e, dailyBilge.id)}
								>
									🗑️
								</button>
							{/if}
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	</div>
</div>

<style>
	.list-group {
		list-style: none;
		padding-left: 0;
	}

	.list-group-item {
		padding: 0.75rem 1.25rem;
		margin-bottom: 0.125rem;
		background-color: #f8f9fa;
		border: 1px solid #ddd;
	}

	.btn-red {
		background-color: red;
		color: white;
	}

	.btn-sm {
		padding: 0.25rem 0.5rem;
	}

	.tabs {
		margin-top: 1rem;
	}

	.tab {
		margin-bottom: 1rem;
	}
</style>
