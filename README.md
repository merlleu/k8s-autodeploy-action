# k8s-autodeploy GitHub Action

This GitHub Action makes an HTTP request to k8s-autodeploy server to redeploy a service.

## Inputs

### `host`

**Required** The hostname of the service to redeploy.

### `token`

**Required** The authorization token for the redeploy API.

### `image`

**Required** The name of the image to deploy.

## Outputs

### `service`

The list of services that were redeployed.

## Example usage

```yaml
uses: https://github.com/merlleu/k8s-autodeploy-action@v1
with:
  host: example.com
  token: ${{ secrets.REDEPLOY_TOKEN }}
  image: my-image
```

In this example, the action is used to redeploy the `my-image` image on the `example.com` host using the `REDEPLOY_TOKEN` secret. The `service` output can be used in subsequent steps of the workflow.