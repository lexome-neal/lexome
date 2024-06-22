const bookAssetQuery = graphql(`
query GetBookAsset($id: String!) {
  getBook(id: $id) {
    assetUrl
  }
}
`

const useBookAsset = (bookId: string) => {

}