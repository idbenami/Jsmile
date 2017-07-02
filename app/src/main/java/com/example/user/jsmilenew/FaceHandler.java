package com.example.user.jsmilenew;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.net.ssl.HttpsURLConnection;

/**
 * Created by user on 02/07/2017.
 */
public class FaceHandler {

    public static void faceRequest() {
        /*HashMap<String, String> requestParams = new HashMap<String, String>();

        requestParams.put("api_key", "wCdTMSffp5KbwAo68NO6YVK8bz5hFim9");
        requestParams.put("api_secret", "LYV0oGe-SBy1fGQaxRhY_WpdE4dLRMRP");
        requestParams.put("image_file", "/Users/user/Desktop/idanPhoto.jpg");*/

        try {
            String urlParameters = "api_key=" + URLEncoder.encode("wCdTMSffp5KbwAo68NO6YVK8bz5hFim9", "UTF-8") +
                    "&api_secret=" + URLEncoder.encode("LYV0oGe-SBy1fGQaxRhY_WpdE4dLRMRP", "UTF-8") +
                    "&image_file=/Users/user/Desktop/idanPhoto.jpg";

            executePost("https://api-us.faceplusplus.com/facepp/v3/detect", urlParameters);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    public static String executePost(String targetURL, String urlParameters) {
        HttpURLConnection connection = null;

        try {
            //Create connection
            URL url = new URL(targetURL);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type",
                    "application/x-www-form-urlencoded");

            connection.setRequestProperty("Content-Length",
                    Integer.toString(urlParameters.getBytes().length));
            connection.setRequestProperty("Content-Language", "en-US");

            connection.setUseCaches(false);
            connection.setDoOutput(true);

            //Send request
            DataOutputStream wr = new DataOutputStream (
                    connection.getOutputStream());
            wr.writeBytes(urlParameters);
            wr.close();

            //Get Response
            InputStream is = connection.getInputStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            StringBuilder response = new StringBuilder(); // or StringBuffer if Java version 5+
            String line;
            while ((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
}
