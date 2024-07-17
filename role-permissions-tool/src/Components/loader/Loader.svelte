<script>
    import { loader } from "../../Stores/loader.store" // Import the loader store
  
    // Subscribe to the loader store
    let show = false;
    loader.subscribe(value => {
      show = value;
    });
    
  </script>
  
  {#if show}
    <div class="loader_wrapper">
      <div class="loader">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260">
          <!-- Circles with animations as you provided -->
          <circle
            fill="#4285F4"
            stroke="#4285F4"
            stroke-width="2"
            r="25"
            cx="40"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="1"
              values="65;135;65"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.6"
            ></animate>
          </circle>
          <circle
            fill="#34A853"
            stroke="#34A853"
            stroke-width="2"
            r="25"
            cx="100"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="1"
              values="65;135;65"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          <circle
            fill="#FBBC05"
            stroke="#FBBC05"
            stroke-width="2"
            r="25"
            cx="160"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="1"
              values="65;135;65"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          <circle
            fill="#EA4335"
            stroke="#EA4335"
            stroke-width="2"
            r="25"
            cx="220"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="1"
              values="65;135;65"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
        </svg>
      </div>
    </div>
  {/if}
  
  <style>
    .loader_wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(
        128,
        128,
        128,
        0.5
      ); /* Grey background with some transparency */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000; /* High z-index to ensure it covers other content */
    }
  
    .loader {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    svg {
      width: 100%;
      height: auto;
    }
  </style>
  