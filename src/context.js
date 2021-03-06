import React from 'react';
import { ethers } from 'ethers';

const AppContext = React.createContext();

export class ContextProvider extends React.Component {
    state = {
        ctx: {
            address: null,
            collections: [], // array<address>
            ethers: {
                provider: null,
                signer: null,
            },
            contracts: {
                Zubiter: null,
                ZubiterClonableERC721: null,
            },
            alerts: [
                /*
                 * variant -> string
                 * content -> string
                 */
            ]
        },
        collection: {
            name: null,
            symbol: null,
            address: null,
            transferred: null,
            tokensById: {}, // id => token meta
            tokens: [], // array<num>
            events: [], // transfer events
        },
        collectionAddressMap: {} // address => collection name
    }

    setCtx = ctx => this.setState(prev => ({ctx: Object.assign(prev.ctx, ctx)}));
    setCollection = collection => this.setState(prev => ({collection: Object.assign(prev.collection, collection)}));

    constructor (props) {
        super(props);
        
        if (window.ethereum) {
            this.state.ctx.ethers.provider = new ethers.providers.Web3Provider(window.ethereum);
        }
        window.ctx = this.state
    }

    render() {
        const { ctx, collection } = this.state
        const { setCtx, setCollection } = this
    
        return (
          <AppContext.Provider
            value={{
              ctx,
              setCtx,
              collection,
              setCollection,
            }}
          >
            {this.props.children}
          </AppContext.Provider>
        )
    }
}
export const ContextConsumer = AppContext.Consumer;

export default AppContext;
